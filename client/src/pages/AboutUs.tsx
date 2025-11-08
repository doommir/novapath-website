import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb, ArrowLeft, Calendar } from "lucide-react";
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

export default function AboutUs() {
  const reducedMotion = useReducedMotion();

  const values = [
    {
      icon: Users,
      title: "Educators First",
      description: "We believe educators are the experts. Our tools empower them, never replace them."
    },
    {
      icon: Target,
      title: "Real Solutions",
      description: "We focus on solving actual school challenges, not building technology for its own sake."
    },
    {
      icon: Lightbulb,
      title: "AI Literacy",
      description: "We believe in teaching AI literacy through hands-on cobuilding, not passive presentations."
    }
  ];

  const linkedInPosts: LinkedInPostProps[] = [
    {
      postUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7392719772326649856?collapsed=1",
      title: "Our Story",
      description: "Learn about our journey and mission to transform education with AI.",
      date: "November 2025"
    },
  ];

  const featuredArticle = {
    title: "Featured: EdWeek Article on NovaPath's Founder",
    description: "\"Want Teachers to Learn How to Use AI for Instruction? Let Them Design the Tools\" - Education Week profiles Daniel Whitlock and his work helping educators build AI tools that solve real classroom challenges.",
    url: "https://www.edweek.org/technology/want-teachers-to-learn-how-to-use-ai-for-instruction-let-them-design-the-tools/2025/08",
    date: "August 2025"
  };

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-about-headline">
              About NovaPath
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
              We're building AI-powered tools that empower educators and help schools run more effectively — without replacing the human touch that makes education work.
            </p>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`value-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <value.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 text-white">
                          {value.title}
                        </h3>
                        <p className="text-foreground/80">
                          {value.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="mb-20"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover-elevate">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      {featuredArticle.description}
                    </p>
                    <a
                      href={featuredArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="outline" data-testid="button-read-article">
                        Read the Full Article
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Recent Updates
            </h2>
            <div className="space-y-8">
              {linkedInPosts.map((post, index) => (
                <LinkedInPost key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
