import { useRef, useState } from "react";
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
import { insertAutograderInquirySchema, type InsertAutograderInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Mic,
  Sparkles,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Database,
  Loader2,
  BookOpen,
  Award,
  TrendingUp
} from "lucide-react";
import Footer from "@/components/Footer";

export default function AutoGrader() {
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Hero onCtaClick={scrollToForm} />
      <ProblemSolution />
      <HowItWorks />
      <RubricFramework />
      <FeedbackExamples />
      <TechStack />
      <Impact />
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_1200px_at_50%_40%,hsl(260,90%,60%,0.25),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_1400px_1000px_at_70%_60%,hsl(280,85%,65%,0.20),transparent_50%)] animate-pulse-slow" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary" data-testid="text-badge">
              Navigator Auto-Grading
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-hero-headline">
            Instant AI Scoring for Paper-Based Exit Tickets
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
            Students write, snap a photo, read aloud — and receive instant, scaffolded feedback aligned to standards. OCR + AI transforms handwritten work into actionable insights while building writing and speaking mastery simultaneously.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 shadow-[0_0_40px_-5px_hsl(260,90%,60%,0.4)] hover:shadow-[0_0_60px_-5px_hsl(260,90%,60%,0.6)] transition-shadow duration-300"
              onClick={onCtaClick}
              data-testid="button-request-demo"
            >
              Request a Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: "OCR Handwriting", icon: FileText },
              { label: "Voice Evaluation", icon: Mic },
              { label: "Rubric Scoring", icon: Award },
              { label: "Instant Feedback", icon: Zap }
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

function ProblemSolution() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <span className="text-sm font-medium text-red-400">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-problem-headline">
              Hours Lost to Manual Grading
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg">
              <p>
                Teachers spend countless hours grading short written responses, with limited time to provide personalized feedback or support oral fluency practice.
              </p>
              <p>
                Students complete thoughtful work on paper, but insights stay locked there — no immediate feedback, no speaking practice, no data for progress tracking.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <span className="text-sm font-medium text-green-400">The Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-solution-headline">
              AI-Powered Instant Feedback
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg">
              <p>
                Navigator's custom web app transforms paper responses into real-time feedback using OCR, Whisper, and LLM-powered rubric scoring.
              </p>
              <p>
                Students write, snap a photo, read their response aloud, and receive instant, scaffolded feedback aligned to standards — while simultaneously building writing and speaking mastery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      icon: FileText,
      title: "Student Completes Exit Ticket",
      description: "Students write their response on paper, following the RACE framework or other writing protocols."
    },
    {
      icon: Camera,
      title: "Takes a Photo",
      description: "Using an iPad or device camera, student captures their handwritten work."
    },
    {
      icon: Sparkles,
      title: "OCR Extracts Text",
      description: "Google Vision OCR instantly converts handwriting into digital text with high accuracy."
    },
    {
      icon: Mic,
      title: "Reads Response Aloud",
      description: "Student practices oral fluency by reading their written response into the device."
    },
    {
      icon: BookOpen,
      title: "Whisper Transcribes & Evaluates",
      description: "OpenAI Whisper transcribes speech and assesses clarity, fluency, and pronunciation."
    },
    {
      icon: Award,
      title: "LLM Applies Rubric",
      description: "GPT-4o-mini scores the written response across all rubric categories with precision."
    },
    {
      icon: MessageSquare,
      title: "AI Provides Targeted Feedback",
      description: "Students receive growth-focused, actionable feedback: what they did well and exactly how to improve."
    },
    {
      icon: Database,
      title: "Score Synced to Dashboard",
      description: "Results automatically push to Google Sheets and Navigator dashboards for progress tracking."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-howitworks-headline">
            How It Works
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            From paper to personalized feedback in seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`step-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <step.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-2 text-white" data-testid={`text-step-title-${index}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/80" data-testid={`text-step-description-${index}`}>
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

function RubricFramework() {
  const reducedMotion = useReducedMotion();

  const categories = [
    {
      name: "Restate the Question",
      levels: [
        "Clearly & fluidly restates question, citing title/section",
        "Accurately restates in full sentence",
        "Attempts but may omit/reorder",
        "Partially or inaccurately restates"
      ]
    },
    {
      name: "Answer the Question",
      levels: [
        "Correct, complete, insightful",
        "Correct and complete",
        "Partially correct",
        "Incorrect or missing"
      ]
    },
    {
      name: "Cite Evidence",
      levels: [
        "Smoothly integrates accurate quotes",
        "Refers explicitly with accurate quotes",
        "Some explicit but unclear",
        "No or unrelated evidence"
      ]
    },
    {
      name: "Elaborate",
      levels: [
        "Thorough, deep explanation",
        "Logical, relevant explanation",
        "Weak or minimal reasoning",
        "Missing or unclear reasoning"
      ]
    }
  ];

  const levelNames = ["4 - Exceeding", "3 - Demonstrating", "2 - Progressing", "1 - Developing"];

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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-rubric-headline">
            Rubric Scoring Framework
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-4">
            AI evaluates responses across four key categories, each scored on a 4-level scale.
          </p>
          <p className="text-sm text-foreground/60 max-w-xl mx-auto">
            Final Score: Average of category levels → Exceeding / Demonstrating / Progressing / Developing
            <br />
            Whisper Modifier: Speaking & listening clarity and fluency adjust final score ±0.25
          </p>
        </motion.div>

        <div className="space-y-6">
          {categories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: catIndex * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50" data-testid={`rubric-category-${catIndex}`}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-white">{category.name}</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {category.levels.map((level, levelIndex) => (
                      <div
                        key={levelIndex}
                        className="p-3 rounded-lg bg-primary/5 border border-primary/10"
                        data-testid={`rubric-level-${catIndex}-${levelIndex}`}
                      >
                        <div className="text-xs font-semibold text-primary mb-2">
                          {levelNames[levelIndex]}
                        </div>
                        <div className="text-sm text-foreground/80">
                          {level}
                        </div>
                      </div>
                    ))}
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

function FeedbackExamples() {
  const reducedMotion = useReducedMotion();

  const examples = [
    {
      score: "Demonstrating (3.0)",
      feedback: "You restated accurately and chose good evidence. Next: explain why that quote proves your point — start with 'This shows that...'."
    },
    {
      score: "Progressing (2.25)",
      feedback: "Good start on answering the question! To move higher: restate the question in your opening sentence, and make sure your evidence is a direct quote from the text."
    },
    {
      score: "Exceeding (4.0)",
      feedback: "Excellent work! You clearly restated the question, provided strong evidence, and explained your thinking thoroughly. Your fluency when reading aloud was also impressive."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-feedback-headline">
            Sample AI Feedback
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Growth-focused, actionable feedback that guides students to the next level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`feedback-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">{example.score}</span>
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute -left-2 -top-2 h-8 w-8 text-primary/20" />
                    <p className="text-foreground/80 italic pl-6">
                      "{example.feedback}"
                    </p>
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

function TechStack() {
  const reducedMotion = useReducedMotion();

  const tech = [
    {
      name: "Google Vision OCR",
      description: "Industry-leading handwriting recognition extracts text from student work with exceptional accuracy.",
      icon: FileText
    },
    {
      name: "OpenAI Whisper",
      description: "Advanced speech-to-text evaluates fluency, clarity, and pronunciation for speaking assessment.",
      icon: Mic
    },
    {
      name: "GPT-4o-mini",
      description: "Efficient language model applies rubric scoring and generates personalized, growth-focused feedback.",
      icon: Sparkles
    },
    {
      name: "React + Supabase",
      description: "Fast, iPad-optimized web app with robust backend for data sync and progress tracking.",
      icon: Database
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-techstack-headline">
            Powered by Leading AI Technology
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Built on enterprise-grade AI services for accuracy, speed, and reliability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tech.map((item, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`tech-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white" data-testid={`text-tech-name-${index}`}>
                        {item.name}
                      </h3>
                      <p className="text-foreground/80" data-testid={`text-tech-description-${index}`}>
                        {item.description}
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

function Impact() {
  const reducedMotion = useReducedMotion();

  const impacts = [
    {
      icon: Clock,
      title: "Reduces Grading Time",
      description: "Teachers reclaim hours previously spent on manual scoring — AI handles the heavy lifting instantly."
    },
    {
      icon: Target,
      title: "Builds Dual Mastery",
      description: "Students develop writing and speaking skills simultaneously through integrated practice and assessment."
    },
    {
      icon: Zap,
      title: "Delivers Instant Feedback",
      description: "Growth-focused guidance arrives immediately, while concepts are fresh and revision is actionable."
    },
    {
      icon: TrendingUp,
      title: "Syncs to Dashboards",
      description: "Rubric data flows directly to Navigator analytics, enabling data-driven instructional decisions."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" data-testid="text-impact-headline">
            The Impact
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Real outcomes for teachers and students.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`impact-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <impact.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white" data-testid={`text-impact-title-${index}`}>
                        {impact.title}
                      </h3>
                      <p className="text-foreground/80" data-testid={`text-impact-description-${index}`}>
                        {impact.description}
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

function InquirySection() {
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertAutograderInquiry>({
    resolver: zodResolver(insertAutograderInquirySchema),
    defaultValues: {
      email: "",
      name: "",
      school: "",
      role: "",
      gradeLevel: "",
      additionalInfo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertAutograderInquiry) => {
      return apiRequest("POST", "/api/autograder-inquiries", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  async function onSubmit(data: InsertAutograderInquiry) {
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
            See It in Action
          </h2>
          <p className="text-lg text-foreground/80">
            Request a demo to see how Navigator Auto-Grading transforms student work into instant, actionable feedback.
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
                  We've received your demo request. We'll reach out within 24 hours to schedule a personalized walkthrough.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  data-testid="button-submit-another"
                >
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-autograder-inquiry">
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
                              <SelectItem value="instructional_coach">Instructional Coach</SelectItem>
                              <SelectItem value="literacy_specialist">Literacy Specialist</SelectItem>
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
                    name="gradeLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade Level(s)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-grade">
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
                            placeholder="Tell us about your current grading workflow, specific needs, or questions about Navigator Auto-Grading."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="input-additional-info"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {mutation.isError && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                      <span className="text-sm">
                        Something went wrong. Please try again.
                      </span>
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
                      "Request Demo"
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
