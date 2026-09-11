import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { applyRouteSeo, seoForRequestUrl } from "./lib/blog-seo";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export function resolveClientDist(): string {
  const candidates = [
    path.resolve(process.cwd(), "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(import.meta.dirname, "public"),
    path.resolve(import.meta.dirname, "..", "dist", "public"),
    path.resolve(import.meta.dirname, "..", "public"),
  ];
  return (
    candidates.find((dir) => fs.existsSync(path.join(dir, "index.html"))) ??
    candidates[0]
  );
}

export function serveStatic(app: Express) {
  const distPath = resolveClientDist();

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // On Vercel, express.static() is ignored and files in public/ are served
  // from the CDN. Keep this for Replit / node dist/index.js production.
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    const pathname = req.originalUrl.split("?")[0].replace(/\/$/, "") || "/";
    const renderedPath = path.resolve(distPath, "rendered-pages.json");
    const rendered = fs.existsSync(renderedPath)
      ? JSON.parse(fs.readFileSync(renderedPath, "utf-8")) as Record<string, string>
      : {};
    const seo = seoForRequestUrl(req.originalUrl);
    if (rendered[pathname]) {
      res.status(200).type("html").send(seo ? applyRouteSeo(rendered[pathname], seo) : rendered[pathname]);
      return;
    }
    if (!seo) {
      res.sendFile(indexPath);
      return;
    }
    const html = applyRouteSeo(fs.readFileSync(indexPath, "utf-8"), seo);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
