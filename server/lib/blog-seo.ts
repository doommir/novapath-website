import fs from "fs";
import path from "path";
import {
  BLOG_INDEX_SEO,
  SITE_ORIGIN,
  parseBlogSource,
  postSeoTitle,
  type BlogFrontmatter,
} from "@shared/blog";

export type RouteSeo = {
  title: string;
  description: string;
  url: string;
};

function resolveBlogDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "content", "blog"),
    path.resolve(import.meta.dirname, "..", "content", "blog"),
    path.resolve(import.meta.dirname, "../..", "content", "blog"),
  ];
  return candidates.find((dir) => fs.existsSync(dir)) ?? candidates[0];
}

const BLOG_DIR = resolveBlogDir();

function loadPostsFromDisk(): BlogFrontmatter[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts: BlogFrontmatter[] = [];
  for (const fileName of fs.readdirSync(BLOG_DIR)) {
    if (!fileName.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
    const parsed = parseBlogSource(raw);
    if (parsed) posts.push(parsed.frontmatter);
  }
  return posts;
}

function pathnameFromUrl(url: string): string {
  const pathOnly = url.split("?")[0].split("#")[0];
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly;
}

export function seoForRequestUrl(url: string): RouteSeo | null {
  const pathname = pathnameFromUrl(url);
  const pages: Record<string, { title: string; description: string }> = {
    "/about": { title: "About NovaPath | Schools, Head Start & Nonprofits", description: "Learn about NovaPath and its work supporting educators and program leaders." },
    "/cobuilder": { title: "Build with NovaPath | Custom Software", description: "Discuss a custom software project with NovaPath." },
  };
  if (pages[pathname]) return { ...pages[pathname], url: `${SITE_ORIGIN}${pathname}` };
  if (pathname === "/blog") {
    return {
      ...BLOG_INDEX_SEO,
      url: `${SITE_ORIGIN}/blog`,
    };
  }
  const match = pathname.match(/^\/blog\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];
  const post = loadPostsFromDisk().find((entry) => entry.slug === slug);
  if (!post) {
    return {
      title: "Post not found — NovaPath Education",
      description: "That blog post is not available.",
      url: `${SITE_ORIGIN}/blog/${slug}`,
    };
  }
  return {
    title: postSeoTitle(post.title),
    description: post.description,
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
  };
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceMeta(
  html: string,
  attr: "name" | "property",
  key: string,
  content: string,
): string {
  const escaped = escapeAttribute(content);
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  if (pattern.test(html)) {
    return html.replace(
      pattern,
      `<meta ${attr}="${key}" content="${escaped}" />`,
    );
  }
  return html.replace(
    "</head>",
    `    <meta ${attr}="${key}" content="${escaped}" />\n  </head>`,
  );
}

export function applyRouteSeo(html: string, seo: RouteSeo): string {
  const title = escapeAttribute(seo.title);
  let next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  next = replaceMeta(next, "name", "description", seo.description);
  next = replaceMeta(next, "property", "og:title", seo.title);
  next = replaceMeta(next, "property", "og:description", seo.description);
  next = replaceMeta(next, "name", "twitter:title", seo.title);
  next = replaceMeta(next, "name", "twitter:description", seo.description);
  next = replaceMeta(next, "property", "og:url", seo.url);
  const canonical = `<link rel="canonical" href="${escapeAttribute(seo.url)}" />`;
  next = /<link\s+rel="canonical"[^>]*>/i.test(next)
    ? next.replace(/<link\s+rel="canonical"[^>]*>/i, canonical)
    : next.replace("</head>", canonical + "</head>");
  return next;
}
