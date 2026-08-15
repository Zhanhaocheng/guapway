export const site = {
  name: "guapway",
  title: "guapway",
  description: "生活 / 工作 / 学习 — 锐利记录",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://guapway.vercel.app",
  author: "guapway",
} as const;

export const tags = ["life", "work", "learn"] as const;

export type Tag = (typeof tags)[number];

export const tagLabel: Record<Tag, string> = {
  life: "生活",
  work: "工作",
  learn: "学习",
};

export function isTag(value: string): value is Tag {
  return (tags as readonly string[]).includes(value);
}
