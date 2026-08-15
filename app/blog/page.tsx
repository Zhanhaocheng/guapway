import type { Metadata } from "next";
import { PostCard } from "@/components/ui/PostCard";
import { TagFilter } from "@/components/ui/TagFilter";
import { getAllPosts } from "@/lib/posts";
import { isTag } from "@/lib/site";

export const metadata: Metadata = {
  title: "log",
  description: "生活 / 工作 / 学习 的全部记录",
};

export default async function BlogPage({
  searchParams,
}: PageProps<"/blog">) {
  const params = await searchParams;
  const rawTag = typeof params.tag === "string" ? params.tag : undefined;
  const tag = rawTag && isTag(rawTag) ? rawTag : undefined;
  const posts = getAllPosts().filter((post) => !tag || post.tags.includes(tag));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
        /blog
      </p>
      <h1 className="mt-2 font-mono text-4xl tracking-tight">log</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        按生活、工作、学习筛选。每篇文章是一个本地 MDX 文件。
      </p>
      <div className="mt-8">
        <TagFilter active={tag} />
      </div>
      <div className="mt-8 grid gap-4">
        {posts.length === 0 ? (
          <p className="border border-line px-4 py-8 font-mono text-sm text-muted">
            这个标签下还没有文章。
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
