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
import { insertMathMovesInquirySchema, type InsertMathMovesInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Activity, 
  Brain, 
  Users, 
  Target,
  TrendingUp,
  Lightbulb,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  School,
  UserCircle,
  Sparkles,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import Footer from "@/components/Footer";
import mathMovesVideoUrl from "@assets/Math Moves Promo (1)_1762531305441.mp4";

export default function MathMoves() {
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Hero onCtaClick={scrollToForm} />
      <BigIdea />
      <HowItWorks />
      <PilotResults />
      <WhyItWorks />
      <AISection />
      <div ref={formRef}>
        <PilotSignup />
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
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary" data-testid="text-badge">
              Math Moves
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-hero-headline">
            Turning Math Understanding Into Motion
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
            What if students could learn fractions by moving? Math Moves pairs AI analysis with physical learning to help students internalize math concepts through body-based lessons.
          </p>

          <motion.div
            className="w-full max-w-3xl mx-auto mb-10 rounded-lg overflow-hidden border border-border/50 shadow-2xl"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
          >
            <video
              src={mathMovesVideoUrl}
              controls
              className="w-full"
              data-testid="video-math-moves-demo"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 shadow-[0_0_40px_-5px_hsl(280,95%,60%,0.4)] hover:shadow-[0_0_60px_-5px_hsl(280,95%,60%,0.6)] transition-shadow duration-300"
              onClick={onCtaClick}
              data-testid="button-join-pilot"
            >
              Join the Pilot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: "Embodied Learning", icon: Activity },
              { label: "AI Analysis", icon: Brain },
              { label: "Team Collaboration", icon: Users },
              { label: "Fast Feedback", icon: Zap }
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

function BigIdea() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">The Big Idea</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground" data-testid="text-big-idea-headline">
            What if students could learn fractions by moving?
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto" data-testid="text-big-idea-description">
            Math Moves pairs AI analysis with physical learning to help students internalize math concepts through body-based lessons.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      number: "1",
      title: "Pre-Test in Math Class",
      description: "Students take a short standards-aligned math pre-test with their teacher.",
      icon: GraduationCap,
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our model pinpoints which skills each student hasn't yet mastered — identifying patterns and misconceptions across the class.",
      icon: Brain,
    },
    {
      number: "3",
      title: "Movement-Based Lesson in PE",
      description: "The AI automatically generates a movement-integrated lesson for the PE teacher — games and activities that target those exact math concepts.",
      icon: Activity,
    },
    {
      number: "4",
      title: "Post-Test in Math Class",
      description: "After the movement session, students return to math and retake the assessment. The gains are immediate.",
      icon: Target,
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">How It Works</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground" data-testid="text-how-it-works-headline">
            Four Steps to Movement Mastery
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`step-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-foreground/70 leading-relaxed">{step.description}</p>
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

function PilotResults() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Early Pilot Results</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-foreground" data-testid="text-results-headline">
            After one Math Moves lesson reteach:
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <motion.div
              className="text-center"
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            >
              <div className="text-7xl md:text-8xl font-bold text-foreground/40" data-testid="text-before-percentage">43%</div>
              <p className="text-lg text-foreground/60 mt-2">Before</p>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
            >
              <ArrowRight className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.div
              className="text-center"
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            >
              <div className="text-7xl md:text-8xl font-bold text-primary" data-testid="text-after-percentage">93%</div>
              <p className="text-lg text-primary mt-2 font-semibold">After</p>
            </motion.div>
          </div>

          <motion.p
            className="text-xl md:text-2xl font-semibold text-foreground mb-4"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
            data-testid="text-mastery-gain"
          >
            Mastery of a math standard in a single day.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-foreground/70 italic"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
            data-testid="text-tagline"
          >
            Movement isn't just fun — it cements understanding.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function WhyItWorks() {
  const reducedMotion = useReducedMotion();

  const reasons = [
    {
      title: "Embodied Learning",
      description: "When students move through a concept, they retain it.",
      icon: Activity,
    },
    {
      title: "Cross-Disciplinary Teamwork",
      description: "Math + PE teachers collaborate on a single learning goal.",
      icon: Users,
    },
    {
      title: "AI as Connector",
      description: "The system translates assessment data into physical learning experiences — instantly.",
      icon: Brain,
    },
    {
      title: "Fast Feedback Loop",
      description: "One lesson, one day, visible gains.",
      icon: Zap,
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why It Works</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground" data-testid="text-why-it-works-headline">
            The Science Behind the Movement
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`reason-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <reason.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{reason.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{reason.description}</p>
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

function AISection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI That Understands</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground" data-testid="text-ai-headline">
            AI That Understands How Kids Learn
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6" data-testid="text-ai-description">
            Math Moves isn't replacing instruction — it's amplifying it.
          </p>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed" data-testid="text-ai-detail">
            We use AI to find what's missing and translate it into movement, giving teachers a new lens on student understanding.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PilotSignup() {
  const reducedMotion = useReducedMotion();
  const [submissionState, setSubmissionState] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<InsertMathMovesInquiry>({
    resolver: zodResolver(insertMathMovesInquirySchema),
    defaultValues: {
      email: "",
      name: "",
      school: "",
      role: "",
      gradeLevel: "",
      additionalInfo: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: InsertMathMovesInquiry) => {
      return apiRequest("POST", "/api/math-moves-inquiries", data);
    },
    onSuccess: () => {
      setSubmissionState('success');
      form.reset();
    },
    onError: (error) => {
      console.error("Error submitting inquiry:", error);
      setSubmissionState('error');
    },
  });

  const onSubmit = (data: InsertMathMovesInquiry) => {
    setSubmissionState('idle');
    createInquiryMutation.mutate(data);
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <School className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join the Pilot</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground" data-testid="text-pilot-headline">
            Join the Pilot
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed" data-testid="text-pilot-description">
            We're expanding to new districts for 2025. If your school believes in innovation that gets students moving and mastering, let's connect.
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-8">
              {submissionState === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" data-testid="icon-success" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank you for your interest!</h3>
                  <p className="text-foreground/70">
                    We'll be in touch soon to discuss bringing Math Moves to your district.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {submissionState === 'error' && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3" data-testid="alert-error">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-destructive">
                            There was an error submitting your inquiry. Please try again.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
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
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-role">
                                  <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="pe-teacher">PE Teacher</SelectItem>
                                <SelectItem value="math-coach">Math Coach</SelectItem>
                                <SelectItem value="principal">Principal</SelectItem>
                                <SelectItem value="district-admin">District Administrator</SelectItem>
                                <SelectItem value="curriculum-director">Curriculum Director</SelectItem>
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
                      name="gradeLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade Level(s)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-grade-level">
                                <SelectValue placeholder="Select grade level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="k-2">K-2</SelectItem>
                              <SelectItem value="3-5">3-5</SelectItem>
                              <SelectItem value="6-8">6-8</SelectItem>
                              <SelectItem value="9-12">9-12</SelectItem>
                              <SelectItem value="multiple">Multiple Grades</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your school's interest in Math Moves..."
                              className="resize-none min-h-[100px]"
                              {...field}
                              data-testid="input-additional-info"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={createInquiryMutation.isPending}
                      data-testid="button-submit"
                    >
                      {createInquiryMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-5 w-5" />
                          Join the Pilot
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
