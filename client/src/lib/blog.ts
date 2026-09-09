import { marked } from "marked";
import {
  comparePostsByDateDesc,
  parseBlogSource,
  type BlogFrontmatter,
} from "@shared/blog";

export type BlogPost = BlogFrontmatter & {
  html: string;
};

const sources = import.meta.glob<string>("../../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false });
}

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  const slugs = new Set<string>();

  for (const [filePath, raw] of Object.entries(sources)) {
    const parsed = parseBlogSource(raw);
    if (!parsed) {
      throw new Error(`Invalid blog frontmatter in ${filePath}`);
    }
    if (slugs.has(parsed.frontmatter.slug)) {
      throw new Error(`Duplicate blog slug: ${parsed.frontmatter.slug}`);
    }
    slugs.add(parsed.frontmatter.slug);
    posts.push({
      ...parsed.frontmatter,
      html: renderMarkdown(parsed.body),
    });
  }

  if (posts.length === 0) {
    throw new Error("No blog posts found in content/blog");
  }

  return posts.sort(comparePostsByDateDesc);
}

const posts = loadPosts();

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
