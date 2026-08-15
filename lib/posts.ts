import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isTag, type Tag } from "./site";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: Tag[];
  summary: string;
  draft: boolean;
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function parseTags(value: unknown): Tag[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is Tag => typeof item === "string" && isTag(item));
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "1970-01-01",
    tags: parseTags(data.tags),
    summary: typeof data.summary === "string" ? data.summary : "",
    draft: data.draft === true,
  };
}

export function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const text = match[2].trim();
    headings.push({ id: slugify(text), text, level: match[1].length });
  }
  return headings;
}

function readPostFile(filename: string) {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { meta: toMeta(slug, data), content };
}

export function getAllPosts(includeDrafts = false): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPostFile(file).meta)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return readPostFile(`${slug}.mdx`);
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    prev: index >= 0 ? (posts[index + 1] ?? null) : null,
    next: index > 0 ? (posts[index - 1] ?? null) : null,
  };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}
