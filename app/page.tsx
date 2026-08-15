import Link from "next/link";
import { HeroCanvas } from "@/components/scene/HeroCanvas";
import { PostCard } from "@/components/ui/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
        <div className="scanlines pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-end px-4 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
            id :: guapway
          </p>
          <h1 className="mt-3 max-w-xl font-mono text-5xl tracking-tight sm:text-6xl">
            锐利记录
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
            生活、工作、学习里值得留下的切片。少装饰，多信号。
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase">
            <Link
              href="/blog"
              className="border border-orange bg-orange px-4 py-2 text-background"
            >
              enter log →
            </Link>
            <Link
              href="/about"
              className="border border-line px-4 py-2 text-muted hover:border-orange hover:text-orange"
            >
              about
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-orange">
            latest
          </h2>
          <Link href="/blog" className="font-mono text-xs text-muted hover:text-orange">
            全部文章 →
          </Link>
        </div>
        <div className="grid gap-4">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
