import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";
import { tagLabel } from "@/lib/site";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border border-line bg-background transition-colors hover:border-orange">
      <Link href={`/blog/${post.slug}`} className="block p-5">
        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-orange">/</span>
          {post.tags.map((tag) => (
            <span key={tag} className="text-orange">
              {tagLabel[tag]}
            </span>
          ))}
        </div>
        <h2 className="text-xl tracking-tight group-hover:text-orange">
          {post.title}
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">{post.summary}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-orange">
          read →
        </p>
      </Link>
    </article>
  );
}
