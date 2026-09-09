import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import {
  EducationFooter,
  EducationHeader,
} from "@/components/EducationChrome";
import { getPostBySlug } from "@/lib/blog";
import { usePageMeta } from "@/lib/usePageMeta";
import { formatBlogDate, postSeoTitle } from "@shared/blog";
import "@/education.css";

type BlogPostPageProps = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  usePageMeta(
    post
      ? { title: postSeoTitle(post.title), description: post.description }
      : {
          title: "Post not found — NovaPath Education",
          description: "That blog post is not available.",
        },
  );

  if (!post) {
    return (
      <div className="edu-site">
        <a className="edu-skip" href="#main">
          Skip to content
        </a>
        <EducationHeader />
        <main id="main" tabIndex={-1}>
          <section className="edu-preview" aria-labelledby="missing-post-heading">
            <div className="edu-container">
              <div className="edu-preview-panel">
                <p className="edu-eyebrow">Blog</p>
                <h1 id="missing-post-heading">This piece isn’t here.</h1>
                <p>
                  That address doesn’t match a published post. The writing that
                  is live lives on the blog index.
                </p>
                <div className="edu-preview-actions">
                  <Link className="edu-button" href="/blog">
                    Back to the blog <ArrowUpRight size={18} />
                  </Link>
                  <a className="edu-text-link" href="/">
                    NovaPath Education home
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <EducationFooter />
      </div>
    );
  }

  return (
    <div className="edu-site">
      <a className="edu-skip" href="#main">
        Skip to content
      </a>
      <EducationHeader />
      <main id="main" tabIndex={-1}>
        <article>
          <header className="edu-blog-hero edu-blog-hero-post">
            <div className="edu-container">
              <div className="edu-blog-hero-kicker">
                <Link href="/blog">Blog</Link>
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </div>
              <h1>{post.title}</h1>
              <p className="edu-blog-hero-intro">{post.description}</p>
            </div>
          </header>
          <div className="edu-blog-article">
            <div className="edu-container">
              <div
                className="edu-prose"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
              <div className="edu-blog-article-foot">
                <Link className="edu-text-link" href="/blog">
                  All posts <ArrowUpRight size={16} />
                </Link>
                <a className="edu-button" href="/#contact">
                  Discuss a school need <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <EducationFooter />
    </div>
  );
}
