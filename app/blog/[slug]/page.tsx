import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  extractHeadings,
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/posts";
import { site, tagLabel } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.meta.draft) return {};

  return {
    title: post.meta.title,
    description: post.meta.summary,
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      type: "article",
      publishedTime: post.meta.date,
      url: `${site.url}/blog/${slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.meta.draft) notFound();

  const headings = extractHeadings(post.content);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article className="mx-auto max-w-5xl px-4 py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
        /blog/{slug}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl tracking-tight">{post.meta.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
        <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
        {post.meta.tags.map((tag) => (
          <Link key={tag} href={`/blog?tag=${tag}`} className="text-orange hover:underline">
            {tagLabel[tag]}
          </Link>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">{post.meta.summary}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="mdx max-w-2xl">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
        {headings.length > 0 ? (
          <aside className="hidden lg:block">
            <div className="sticky top-20 border border-line p-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-orange">
                contents
              </p>
              <nav className="mt-3 flex flex-col gap-2 font-mono text-xs">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`text-muted hover:text-orange ${heading.level === 3 ? "pl-3" : ""}`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}
      </div>

      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className="border border-line p-4 hover:border-orange">
            <p className="font-mono text-[11px] uppercase text-muted">上一篇</p>
            <p className="mt-2 text-sm">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="border border-line p-4 text-right hover:border-orange"
          >
            <p className="font-mono text-[11px] uppercase text-muted">下一篇</p>
            <p className="mt-2 text-sm">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
