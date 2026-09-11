import { useEffect } from "react";

const DEFAULT_TITLE =
  "NovaPath — Schools, Head Start & Nonprofits";
const DEFAULT_DESCRIPTION =
  "CoachingOS, wage and compensation studies, and training and compliance courses for schools, Head Start programs, and nonprofits.";
const DEFAULT_OG_DESCRIPTION =
  "Coaching software, compensation studies, and staff training for schools, Head Start programs, and nonprofits.";

type PageMeta = {
  title: string;
  description: string;
};

function setMeta(
  attr: "name" | "property",
  key: string,
  content: string,
): void {
  const selector = `meta[${attr}="${key}"]`;
  const existing = document.head.querySelector(selector);
  if (existing) {
    existing.setAttribute("content", content);
    return;
  }
  const tag = document.createElement("meta");
  tag.setAttribute(attr, key);
  tag.setAttribute("content", content);
  document.head.appendChild(tag);
}

function applyMeta({ title, description }: PageMeta, ogDescription?: string) {
  document.title = title;
  const canonicalUrl = `https://explorenovapath.com${window.location.pathname.replace(/\/$/, "") || "/"}`;
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
  setMeta("property", "og:url", canonicalUrl);
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", ogDescription ?? description);
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", ogDescription ?? description);
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    applyMeta({ title, description });
    return () => {
      applyMeta(
        { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
        DEFAULT_OG_DESCRIPTION,
      );
    };
  }, [title, description]);
}
