import Link from "next/link";
import { tagLabel, tags, type Tag } from "@/lib/site";

export function TagFilter({ active }: { active?: Tag }) {
  const items = [{ href: "/blog", label: "全部", key: "all" }, ...tags.map((tag) => ({
    href: `/blog?tag=${tag}`,
    label: tagLabel[tag],
    key: tag,
  }))];

  return (
    <div className="flex flex-wrap gap-2 font-mono text-xs uppercase">
      {items.map((item) => {
        const isActive = item.key === "all" ? !active : item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`border px-3 py-1 transition-colors ${
              isActive
                ? "border-orange bg-orange text-background"
                : "border-line text-muted hover:border-orange hover:text-orange"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
