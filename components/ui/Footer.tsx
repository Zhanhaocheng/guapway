import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} guapway</p>
        <div className="flex gap-4">
          <Link href="/rss.xml" className="hover:text-orange">
            rss
          </Link>
          <Link href="/blog" className="hover:text-orange">
            log
          </Link>
          <span>life / work / learn</span>
        </div>
      </div>
    </footer>
  );
}
