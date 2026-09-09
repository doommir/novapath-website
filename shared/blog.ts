export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export type ParsedBlogSource = {
  frontmatter: BlogFrontmatter;
  body: string;
};

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseFrontmatterBlock(block: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = stripQuotes(line.slice(separator + 1).trim());
    if (key && value) {
      fields[key] = value;
    }
  }
  return fields;
}

export function parseBlogSource(raw: string): ParsedBlogSource | null {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return null;

  const fields = parseFrontmatterBlock(match[1]);
  const title = fields.title?.trim();
  const date = fields.date?.trim();
  const description = fields.description?.trim();
  const slug = fields.slug?.trim();

  if (!title || !date || !description || !slug) return null;
  if (!DATE_RE.test(date) || !SLUG_RE.test(slug)) return null;

  return {
    frontmatter: { title, date, description, slug },
    body: match[2].trim(),
  };
}

export function comparePostsByDateDesc(
  a: Pick<BlogFrontmatter, "date" | "slug">,
  b: Pick<BlogFrontmatter, "date" | "slug">,
): number {
  if (a.date === b.date) return a.slug.localeCompare(b.slug);
  return a.date < b.date ? 1 : -1;
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export const BLOG_INDEX_SEO = {
  title: "Blog — NovaPath Education",
  description:
    "Notes from NovaPath on K–12 and charter school work: coaching-support software, parent-led tools vs. enrollment, and how we talk about the practice.",
} as const;

export const SITE_ORIGIN = "https://explorenovapath.com";

export function postSeoTitle(title: string): string {
  return `${title} — NovaPath Education`;
}
