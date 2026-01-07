import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function NavigatorSchools() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_1200px_at_50%_40%,hsl(260,90%,60%,0.15),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            className="text-center mb-16"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Deployed at Navigator Schools
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" data-testid="text-navigator-title">
              Navigator Schools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See NovaPath's coaching infrastructure in action
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <Card className="bg-card/50 border-border/50 overflow-hidden h-full" data-testid="card-coaching-os-demo">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Coaching OS Demo</h2>
                      <p className="text-sm text-muted-foreground">Coaching operating system</p>
                    </div>
                    <Link href="/coachingOSdemo">
                      <a className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors" data-testid="link-fullscreen-demo">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Link>
                  </div>
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://school-os.replit.app/"
                      className="w-full h-full border-0"
                      title="Coaching OS Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      data-testid="iframe-coaching-os-tile"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 overflow-hidden h-full" data-testid="card-navigrade-demo">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <div>
                      <h2 className="text-lg font-semibold text-white">NaviGrade</h2>
                      <p className="text-sm text-muted-foreground">AI-powered grading system</p>
                    </div>
                    <Link href="/navigrade">
                      <a className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors" data-testid="link-navigrade-fullscreen">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Link>
                  </div>
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://NaviGrade.replit.app/"
                      className="w-full h-full border-0"
                      title="NaviGrade Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      data-testid="iframe-navigrade-tile"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
