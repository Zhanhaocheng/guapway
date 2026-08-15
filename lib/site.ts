const FALLBACK_SITE_URL = "https://guapway-iota.vercel.app";
const RETIRED_SITE_HOSTS = new Set(["guapway.vercel.app"]);

function withHttps(host: string) {
  if (host.startsWith("http://") || host.startsWith("https://")) return host;
  return `https://${host}`;
}

function normalizeSiteUrl(host: string) {
  return withHttps(host).replace(/\/$/, "");
}

function isUsableSiteUrl(host: string) {
  try {
    const url = new URL(normalizeSiteUrl(host));
    return !RETIRED_SITE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    FALLBACK_SITE_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value && isUsableSiteUrl(value)) return normalizeSiteUrl(value);
  }

  return FALLBACK_SITE_URL;
}

export const site = {
  name: "guapway",
  title: "guapway",
  description: "生活 / 工作 / 学习 — 锐利记录",
  url: resolveSiteUrl(),
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
