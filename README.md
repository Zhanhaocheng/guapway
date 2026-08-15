# guapway

生活 / 工作 / 学习 的公开日志。深色、简约、锐利；主色鲜橙；首页有克制的 Three.js 动效。文章用本地 MDX，推到 GitHub 后由 Vercel 自动发布。

- 本地：<http://localhost:3000>
- 目标仓库：<https://github.com/Zhanhaocheng/guapway>
- 目标线上：<https://guapway.vercel.app>

## 本地运行

需要 Node.js 20+ 与 npm。

```bash
npm install
npm run dev
```

打开 <http://localhost:3000>。

```bash
npm run build
npm start
```

## 发布新文章

1. 在 `content/posts/` 新建 `your-slug.mdx`。文件名就是网址：`/blog/your-slug`。
2. 按下面的 frontmatter 写元数据，正文用 Markdown（可夹 MDX）：

```mdx
---
title: 标题
date: 2026-08-15
tags: [learn]
summary: 一句话摘要
draft: false
---

正文从这里开始。
```

`tags` 只能是 `life`、`work`、`learn`（可多选）。`draft: true` 时不会出现在列表、RSS 和线上详情。

3. `npm run dev` 预览 `/blog` 和文章页。
4. 提交并推到 `main`。Vercel 会自动构建上线。

## 技术栈

- Next.js（App Router）+ TypeScript + Tailwind CSS
- `content/posts/*.mdx` + `gray-matter` + `next-mdx-remote`
- `three` + `@react-three/fiber` + `@react-three/drei`（仅首页，动态加载）
- 系统开启「减少动态效果」时，首页 3D 会降级为静态网格

## 部署到 GitHub + Vercel

代码先放在 GitHub，再用 Vercel 连仓库。个人博客的 Hobby 套餐足够，不必配环境变量（站点 URL 默认 `https://guapway.vercel.app`）。

### 1. 推到 GitHub

本机已登录 `Zhanhaocheng` 的话，在项目根目录执行：

```bash
git add .
git commit -m "Initial commit: guapway blog"
gh repo create Zhanhaocheng/guapway --public --source=. --remote=origin --push
```

仓库会是 <https://github.com/Zhanhaocheng/guapway>。

### 2. 用 Vercel 发布

1. 用同一个 GitHub 账号打开 [Vercel](https://vercel.com) 并登录。
2. **Add New → Project**，Import `guapway`。
3. Framework Preset 选 **Next.js**；Project Name 填 **guapway**（得到 `https://guapway.vercel.app`；若名字被占用，改项目名即可）。
4. 点击 Deploy。之后每次 `main` 的 push 会自动生产部署，Pull Request 会出 Preview URL。

可选：在 Vercel 里加 `NEXT_PUBLIC_SITE_URL=https://guapway.vercel.app`，与默认值一致，方便以后换自定义域名。

### 3. 自定义域名（以后）

买好 `guapway.dev` 一类域名后，到 Vercel → Project → Settings → Domains 添加，按提示做 CNAME。代码不用改，只需把 `NEXT_PUBLIC_SITE_URL` 改成新域名。

备选：Cloudflare Pages + `@opennextjs/cloudflare`。Next.js 在 Vercel 上更省事，作为默认方案。

## 目录

```
app/                 路由、RSS、sitemap
components/scene/    首页 Three.js
components/ui/       导航、卡片、标签筛选
components/mdx/      MDX 标题等组件
content/posts/       文章
lib/posts.ts         读盘、排序、标签过滤
lib/site.ts          站点信息
```
