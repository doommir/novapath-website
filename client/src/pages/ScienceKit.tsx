import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPreorderSchema, type InsertPreorder } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Sparkles, 
  Hand, 
  GraduationCap, 
  TestTube2, 
  Palette, 
  Droplets, 
  Rocket, 
  QrCode,
  Beaker,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail
} from "lucide-react";
import scienceKitVideo from "@assets/20251104_1510_01k98d34e9fsyav1rsyt16ykwc_1762298350183.mov";

export default function ScienceKit() {
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Hero onCtaClick={scrollToForm} />
      <WhatMakesDifferent />
      <WhatsInside />
      <LearningOutcomes />
      <Testimonials />
      <div ref={formRef}>
        <PreOrderSection />
      </div>
      <Footer />
    </div>
  );
}

function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_1200px_at_50%_40%,hsl(280,95%,60%,0.25),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1400px_1000px_at_70%_60%,hsl(340,85%,65%,0.20),transparent_50%)] animate-pulse-slow" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <TestTube2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary" data-testid="text-badge">
                AI-Infused Science Kit
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-hero-headline">
              Hands-On Experiments + AI Assistant = Learning That Sticks
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
              Bring the magic of chemistry and the power of artificial intelligence into your home or classroom. 
              NovaPath's AI-Infused Science Kit blends hands-on experiments with an interactive AI guide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
              <Button
                size="lg"
                className="text-lg px-8 shadow-[0_0_40px_-5px_hsl(280,95%,60%,0.4)] hover:shadow-[0_0_60px_-5px_hsl(280,95%,60%,0.6)] transition-shadow duration-300"
                onClick={onCtaClick}
                data-testid="button-preorder-hero"
              >
                Reserve Your Kit
              </Button>
            </div>


            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto md:mx-0">
              {[
                { label: "Ages 6-12", icon: GraduationCap },
                { label: "Safe Materials", icon: Beaker },
                { label: "AI Guide", icon: Sparkles },
                { label: "STEM Aligned", icon: CheckCircle2 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-card/30 border border-border/50"
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 + index * 0.1 }}
                  data-testid={`feature-${index}`}
                >
                  <item.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-2xl">
              <video
                src={scienceKitVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                data-testid="video-demo"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatMakesDifferent() {
  const reducedMotion = useReducedMotion();

  const features = [
    {
      icon: Sparkles,
      title: "AI Assistant Included",
      description: "Scan the QR code to launch your own friendly AI lab partner. It talks, explains, and guides your child step-by-step."
    },
    {
      icon: Hand,
      title: "Tactile + Tech-Powered",
      description: "Kids mix, pour, and explore with real materials while the AI helps them observe, question, and understand."
    },
    {
      icon: GraduationCap,
      title: "Built for Learning (and Fun)",
      description: "Each activity is aligned to STEM learning goals, but designed to feel like play."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-section-label">
            Why It's Different
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-different-title">
            What Makes This Kit Different?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`feature-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsInside() {
  const reducedMotion = useReducedMotion();

  const items = [
    { icon: TestTube2, text: "Baking soda & vinegar for chemical reactions" },
    { icon: Palette, text: "Food coloring for color-mixing fun" },
    { icon: Droplets, text: "Cornstarch to make Oobleck (non-Newtonian slime!)" },
    { icon: Rocket, text: "Mini rocket + safe launch experiment" },
    { icon: QrCode, text: "QR code card to access your personal AI assistant" },
    { icon: Beaker, text: "2 test tubes + pipettes" }
  ];

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-inside-label">
            What's Inside
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-inside-title">
            Everything You Need to Get Started
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-inside-subtitle">
            All experiments use household-safe materials and are classroom-approved.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border hover-elevate"
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.05 }}
              data-testid={`item-${index}`}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningOutcomes() {
  const reducedMotion = useReducedMotion();

  const outcomes = [
    "Understand acids, bases, and gas reactions",
    "Practice observation and inference",
    "Build early AI literacy through interactive guidance",
    "Gain confidence in science with a playful approach"
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-outcomes-label">
            Learning Outcomes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-outcomes-title">
            What Your Child Will Learn
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-4"
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              data-testid={`outcome-${index}`}
            >
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-lg text-foreground">{outcome}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reducedMotion = useReducedMotion();

  const testimonials = [
    {
      quote: "The AI guide felt like a real helper! My daughter did every experiment and couldn't wait to do them again.",
      author: "Alicia M.",
      role: "Homeschool Parent"
    },
    {
      quote: "This is the first time I've seen AI used in a way that supports student learning instead of distracting from it.",
      author: "Mrs. Perez",
      role: "3rd Grade Teacher"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-testimonials-label">
            What People Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            Loved by Parents & Teachers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full" data-testid={`testimonial-${index}`}>
                <CardContent className="p-8">
                  <p className="text-lg text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreOrderSection() {
  const [submitted, setSubmitted] = useState(false);
  const reducedMotion = useReducedMotion();

  const form = useForm<InsertPreorder>({
    resolver: zodResolver(insertPreorderSchema),
    defaultValues: {
      email: "",
      name: "",
      quantity: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPreorder) => {
      return apiRequest("POST", "/api/preorders", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  const onSubmit = (data: InsertPreorder) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            className="rounded-lg bg-chart-3/10 border border-chart-3/30 p-8 text-center backdrop-blur-sm shadow-lg"
            data-testid="message-success"
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.5, type: "spring" }}
          >
            <CheckCircle2 className="h-12 w-12 text-chart-3 mx-auto mb-4" data-testid="icon-success" />
            <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-success-title">
              You're on the list!
            </h3>
            <p className="text-muted-foreground" data-testid="text-success-message">
              We'll email you when the Science Kit is ready to ship. Get ready for some amazing experiments!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          className="text-center mb-8"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-preorder-title">
            Reserve Your Science Kit
          </h2>
          <p className="text-sm text-muted-foreground" data-testid="text-shipping">
            Ships in eco-friendly packaging
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field} 
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage data-testid="error-name" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="you@example.com" 
                          {...field} 
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage data-testid="error-email" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-quantity">
                            <SelectValue placeholder="How many kits?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1" data-testid="option-quantity-1">1 Kit</SelectItem>
                          <SelectItem value="2" data-testid="option-quantity-2">2 Kits</SelectItem>
                          <SelectItem value="3" data-testid="option-quantity-3">3 Kits</SelectItem>
                          <SelectItem value="4" data-testid="option-quantity-4">4 Kits</SelectItem>
                          <SelectItem value="5" data-testid="option-quantity-5">5+ Kits</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage data-testid="error-quantity" />
                    </FormItem>
                  )}
                />

                {mutation.isError && (
                  <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/30 rounded-lg" data-testid="message-error">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={mutation.isPending}
                  data-testid="button-submit-preorder"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Reserve Your Kit"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  For educator bundles and school orders,{" "}
                  <a href="mailto:schools@novapath.ai" className="text-primary hover:underline" data-testid="link-contact-schools">
                    contact us
                  </a>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <a
            href="#about"
            className="hover:text-foreground transition-colors"
            data-testid="link-about"
          >
            About
          </a>
          <span className="hidden md:inline text-border">•</span>
          <a
            href="#privacy"
            className="hover:text-foreground transition-colors"
            data-testid="link-privacy"
          >
            Privacy
          </a>
          <span className="hidden md:inline text-border">•</span>
          <a
            href="#contact"
            className="hover:text-foreground transition-colors"
            data-testid="link-contact"
          >
            Contact
          </a>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4" data-testid="text-copyright">
          © {new Date().getFullYear()} NovaPath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
