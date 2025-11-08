import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/Footer";

interface LinkedInPostProps {
  postUrl: string;
  title?: string;
  description?: string;
  date?: string;
}

function LinkedInPost({ postUrl, title, description, date }: LinkedInPostProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
      className="mb-12"
    >
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <CardContent className="p-6">
          {(title || description || date) && (
            <div className="mb-4">
              {date && (
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
              )}
              {title && (
                <h3 className="text-xl font-semibold text-white mb-2">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-foreground/80">{description}</p>
              )}
            </div>
          )}
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden border border-border/50 bg-background/30">
              <iframe
                src={postUrl}
                height="516"
                width="504"
                frameBorder="0"
                allowFullScreen
                title="Embedded LinkedIn post"
                className="max-w-full"
                data-testid="linkedin-embed"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Blog() {
  const reducedMotion = useReducedMotion();

  const posts: LinkedInPostProps[] = [
    {
      postUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7392719772326649856?collapsed=1",
      title: "Latest Updates from NovaPath",
      description: "Check out our recent thoughts on AI in education and how we're helping schools build better solutions.",
      date: "November 2025"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_1200px_at_50%_40%,hsl(280,95%,60%,0.25),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-32">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 gap-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            className="text-center mb-16"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-blog-headline">
              NovaPath Blog
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
              Insights, updates, and stories from the NovaPath team on AI-powered education solutions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <LinkedInPost key={index} {...post} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12 p-8 rounded-lg bg-card/30 border border-border/50"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <p className="text-foreground/80 mb-4">
              Want to add more posts? Simply update the posts array in Blog.tsx with your LinkedIn embed URLs.
            </p>
            <code className="text-sm text-primary bg-primary/10 px-3 py-1 rounded">
              postUrl: "https://www.linkedin.com/embed/feed/update/..."
            </code>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
