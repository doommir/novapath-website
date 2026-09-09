import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import {
  EducationFooter,
  EducationHeader,
} from "@/components/EducationChrome";
import { getAllPosts } from "@/lib/blog";
import { usePageMeta } from "@/lib/usePageMeta";
import { BLOG_INDEX_SEO, formatBlogDate } from "@shared/blog";
import "@/education.css";

export default function BlogIndex() {
  usePageMeta(BLOG_INDEX_SEO);
  const posts = getAllPosts();

  return (
    <div className="edu-site">
      <a className="edu-skip" href="#main">
        Skip to content
      </a>
      <EducationHeader />
      <main id="main" tabIndex={-1}>
        <section className="edu-blog-hero" aria-labelledby="blog-heading">
          <div className="edu-container">
            <div className="edu-blog-hero-kicker">
              <span>Journal</span>
              <span>K–12 · Charter · Coaching support</span>
            </div>
            <h1 id="blog-heading">
              Notes on the work.
              <br />
              <em>Written so they can be shared.</em>
            </h1>
            <p className="edu-blog-hero-intro">
              Short pieces on consulting, custom software, and how we describe
              that work to school leaders — without turning a product into a
              case study.
            </p>
          </div>
        </section>

        <section className="edu-blog-index" aria-label="Blog posts">
          <div className="edu-container">
            <p className="edu-eyebrow">Latest writing</p>
            <ol className="edu-blog-list">
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <article className="edu-blog-card">
                    <div className="edu-blog-card-meta">
                      <span>
                        0{index + 1} / {formatBlogDate(post.date)}
                      </span>
                    </div>
                    <h2>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.description}</p>
                    <Link
                      className="edu-text-link"
                      href={`/blog/${post.slug}`}
                      data-testid={`link-blog-post-${post.slug}`}
                    >
                      Read the piece <ArrowUpRight size={16} />
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <EducationFooter />
    </div>
  );
}
