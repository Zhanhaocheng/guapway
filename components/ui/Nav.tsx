import Link from "next/link";

const links = [
  { href: "/", label: "index" },
  { href: "/blog", label: "log" },
  { href: "/about", label: "about" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-mono text-sm tracking-[0.22em] text-orange uppercase"
        >
          guapway
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-transparent px-3 py-1 text-muted transition-colors hover:border-orange hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
