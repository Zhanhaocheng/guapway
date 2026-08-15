import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "about",
  description: "关于 guapway：生活、工作、学习的公开记录。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
        /about
      </p>
      <h1 className="mt-2 font-mono text-4xl tracking-tight">guapway</h1>
      <div className="mt-8 space-y-6 text-sm leading-8 text-[#d4d4d4]">
        <p>
          这里是 guapway 的公开日志。把生活、工作、学习里真正留下痕迹的部分写下来，
          不包装成人设，也不追求日更。
        </p>
        <p>
          站点刻意做成极客、简约、锐利的样子：近黑底、鲜橙主色、细线网格。
          首页有一层克制的 Three.js 动效，文章页保持干净，方便阅读。
        </p>
        <p>
          发布方式很直接：在{" "}
          <code className="font-mono text-orange">content/posts/</code>{" "}
          新增一篇 MDX，推到 GitHub，Vercel 会自动上线。
        </p>
      </div>
      <dl className="mt-10 grid gap-4 border border-line p-5 font-mono text-xs sm:grid-cols-3">
        <div>
          <dt className="text-orange">life</dt>
          <dd className="mt-2 text-muted">生活切片</dd>
        </div>
        <div>
          <dt className="text-orange">work</dt>
          <dd className="mt-2 text-muted">工作现场</dd>
        </div>
        <div>
          <dt className="text-orange">learn</dt>
          <dd className="mt-2 text-muted">学习笔记</dd>
        </div>
      </dl>
      <Link
        href="/blog"
        className="mt-10 inline-block border border-orange px-4 py-2 font-mono text-xs uppercase text-orange hover:bg-orange hover:text-background"
      >
        去看 log →
      </Link>
    </div>
  );
}
