import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { insertPdInquirySchema, type InsertPdInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Sparkles, 
  Code2, 
  Users, 
  Target,
  Lightbulb,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MessageSquare,
  Wrench,
  Rocket
} from "lucide-react";
import Footer from "@/components/Footer";
import pdVideoUrl from "@assets/20251107_0910_01k9fabws7f8xbk34th8sctjyy_1762524664952.mp4";

export default function ProfessionalDevelopment() {
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Hero onCtaClick={scrollToForm} />
      <WhyCobuildingWorks />
      <TheProcess />
      <ExampleApps />
      <div ref={formRef}>
        <InquirySection />
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
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary" data-testid="text-badge">
              Professional Development
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-hero-headline">
            Learn AI by Building Solutions to Your School's Real Challenges
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
            Skip the theory. Bring your biggest pain points — attendance tracking, parent communication, lesson planning — and leave with working AI apps built by your team. AI literacy sticks when you're solving problems you actually face.
          </p>

          <motion.div
            className="w-full max-w-3xl mx-auto mb-10 rounded-lg overflow-hidden border border-border/50 shadow-2xl"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
          >
            <video
              src={pdVideoUrl}
              controls
              className="w-full"
              data-testid="video-pd-demo"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 shadow-[0_0_40px_-5px_hsl(280,95%,60%,0.4)] hover:shadow-[0_0_60px_-5px_hsl(280,95%,60%,0.6)] transition-shadow duration-300"
              onClick={onCtaClick}
              data-testid="button-schedule-pd"
            >
              Schedule a Session
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: "Hands-On Building", icon: Wrench },
              { label: "AI Coding Agents", icon: Code2 },
              { label: "Real Solutions", icon: Target },
              { label: "Team Empowerment", icon: Users }
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
      </div>
    </section>
  );
}

function WhyCobuildingWorks() {
  const reducedMotion = useReducedMotion();

  const features = [
    {
      icon: Lightbulb,
      title: "AI Literacy Through Practice",
      description: "You don't learn AI by watching presentations. You learn by using AI coding agents to solve real problems. When you build the app that fixes your attendance workflow, you understand how AI works — and what it can't do."
    },
    {
      icon: Target,
      title: "Solve Real Pain Points",
      description: "Your team identifies the problems that waste time every week. We guide you through building the solution together. Leave with a working app that improves your daily work — not a slide deck gathering dust."
    },
    {
      icon: Users,
      title: "Educators Building for Educators",
      description: "No one understands school challenges better than educators. Cobuilding means your solutions are designed by the people who use them, with AI as a supportive tool — not a replacement for human expertise and judgment."
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-section-headline">
            Why Cobuilding Works
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Traditional PD teaches concepts. We build solutions. Together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`feature-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white" data-testid={`text-feature-title-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-foreground/80" data-testid={`text-feature-description-${index}`}>
                        {feature.description}
                      </p>
                    </div>
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

function TheProcess() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      icon: MessageSquare,
      title: "Identify Your Pain Point",
      description: "We start by discussing the workflow that frustrates your team most. Attendance alerts? Parent communication? Progress tracking? Pick the problem that costs you the most time."
    },
    {
      icon: Lightbulb,
      title: "Design the Solution Together",
      description: "Your team knows what a good solution looks like. We facilitate the design process, ensuring the app fits your actual workflow — not a generic template."
    },
    {
      icon: Code2,
      title: "Build with AI Coding Agents",
      description: "Using AI coding agents, we build the app together. You see how prompts become code, how to debug, how to iterate. You're learning AI literacy by doing, not watching."
    },
    {
      icon: Rocket,
      title: "Deploy and Use Immediately",
      description: "By the end of the session, your app is live. Your team can use it that afternoon. You also walk away with the skills to build more tools for future challenges."
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-process-headline">
            The Cobuilding Process
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Four steps from problem to working solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`process-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <step.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <h3 className="font-semibold text-lg text-white" data-testid={`text-step-title-${index}`}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-foreground/80" data-testid={`text-step-description-${index}`}>
                        {step.description}
                      </p>
                    </div>
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

function ExampleApps() {
  const reducedMotion = useReducedMotion();

  const examples = [
    {
      icon: Users,
      title: "Attendance Alert System",
      description: "AI tracks patterns and automatically notifies counselors when a student's absences suggest they need support — before the problem escalates.",
      use_case: "Reduce response time to attendance issues from weeks to hours"
    },
    {
      icon: MessageSquare,
      title: "Family Communication Hub",
      description: "Translate parent messages into multiple languages, send automated updates about student progress, and centralize all family communication in one place.",
      use_case: "Save 5+ hours per week on parent outreach"
    },
    {
      icon: Target,
      title: "IEP Progress Tracker",
      description: "Document student progress toward IEP goals with AI assistance, generate progress reports, and flag students who need additional intervention.",
      use_case: "Cut IEP documentation time by 50%"
    },
    {
      icon: Lightbulb,
      title: "Lesson Planning Assistant",
      description: "AI helps generate differentiated activities based on learning objectives, student needs, and available resources — while teachers maintain full creative control.",
      use_case: "Reclaim evenings and weekends for rest, not planning"
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-background/80 to-background">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-examples-headline">
            Real Solutions Teams Have Built
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            These aren't hypotheticals. These are apps educators have cobuilt to solve their actual challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`example-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <example.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white" data-testid={`text-example-title-${index}`}>
                        {example.title}
                      </h3>
                      <p className="text-foreground/80 mb-3" data-testid={`text-example-description-${index}`}>
                        {example.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <Zap className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          {example.use_case}
                        </span>
                      </div>
                    </div>
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

function InquirySection() {
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertPdInquiry>({
    resolver: zodResolver(insertPdInquirySchema),
    defaultValues: {
      email: "",
      name: "",
      school: "",
      role: "",
      painPoint: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPdInquiry) => {
      return apiRequest("POST", "/api/pd-inquiries", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  async function onSubmit(data: InsertPdInquiry) {
    mutation.mutate(data);
  }

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-background">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-inquiry-headline">
            Ready to Build?
          </h2>
          <p className="text-lg text-foreground/80">
            Tell us about your biggest challenge. We'll schedule a cobuilding session and help your team create the solution.
          </p>
        </motion.div>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-8">
            {submitted ? (
              <motion.div
                className="text-center py-8"
                initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.4 }}
                data-testid="success-message"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Thank You!</h3>
                <p className="text-foreground/80 mb-4">
                  We've received your inquiry. We'll reach out within 24 hours to schedule your cobuilding session.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  data-testid="button-submit-another"
                >
                  Submit Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-pd-inquiry">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Smith"
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
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
                              placeholder="jane@school.edu"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School/District</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Lincoln Elementary"
                              {...field}
                              data-testid="input-school"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-role">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="principal">Principal</SelectItem>
                              <SelectItem value="assistant_principal">Assistant Principal</SelectItem>
                              <SelectItem value="counselor">Counselor</SelectItem>
                              <SelectItem value="instructional_coach">Instructional Coach</SelectItem>
                              <SelectItem value="tech_coordinator">Technology Coordinator</SelectItem>
                              <SelectItem value="district_admin">District Administrator</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="painPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's Your Biggest Challenge?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the workflow or process that frustrates your team most. What takes too much time? What falls through the cracks? Be specific — this helps us prepare for your session."
                            className="min-h-32 resize-none"
                            {...field}
                            data-testid="input-pain-point"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {mutation.isError && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
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
                    data-testid="button-submit-inquiry"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Schedule a Cobuilding Session
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
