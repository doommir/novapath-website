import { useEffect } from "react";

const DEFAULT_TITLE =
  "NovaPath Education — K–12 Consulting & Custom Software";
const DEFAULT_DESCRIPTION =
  "K–12 consulting, custom software, and implementation support. NovaPath builds practical tools alongside the educators and school leaders who use them.";
const DEFAULT_OG_DESCRIPTION =
  "K–12 consulting, custom software, and implementation support. Practical technology built around your schools.";

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
