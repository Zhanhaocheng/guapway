import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col px-4 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange">
        404
      </p>
      <h1 className="mt-3 font-mono text-4xl tracking-tight">signal lost</h1>
      <p className="mt-4 max-w-md text-sm text-muted">
        这条路径上没有内容。回到首页，或者去日志里看看。
      </p>
      <div className="mt-8 flex gap-3 font-mono text-xs uppercase">
        <Link href="/" className="border border-orange bg-orange px-4 py-2 text-background">
          index
        </Link>
        <Link href="/blog" className="border border-line px-4 py-2 text-muted hover:border-orange hover:text-orange">
          log
        </Link>
      </div>
    </div>
  );
}
