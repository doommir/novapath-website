import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInvestorInquirySchema, type InsertInvestorInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { ArrowLeft, DollarSign, Shield, TrendingUp, Users, Lightbulb, Target, CheckCircle, Mail, Phone, User } from "lucide-react";
import Footer from "@/components/Footer";

const NOVAPATH_CONFIG = {
  companyName: "NovaPath",
  valuationCap: 7000000,
  minCheck: 5000,
  maxCheck: 50000,
  raiseWindow: "Now – January 15",
  contactEmail: "founder@novapath.ai",
  contactName: "Dan Whitlock",
  contactPhone: "831-402-1133"
};

const checkSizeOptions = [
  "$5,000",
  "$10,000",
  "$15,000",
  "$25,000",
  "$50,000"
];

const whyNovaPathPoints = [
  {
    icon: TrendingUp,
    title: "Proven Traction",
    description: "Featured in Education Week. Active pilots with multiple K-12 schools and charter networks."
  },
  {
    icon: Users,
    title: "Experienced Leadership",
    description: "Founded by Dan Whitlock, former VP at Navigator Schools with deep K-12 operations expertise."
  },
  {
    icon: Target,
    title: "Clear Market Opportunity",
    description: "$10B+ EdTech market with schools actively seeking AI-powered solutions that actually work."
  },
  {
    icon: Lightbulb,
    title: "Unique Approach",
    description: "Human-centered AI that amplifies educators, not replaces them. Built with teachers, for teachers."
  },
  {
    icon: Shield,
    title: "Investor-Friendly Terms",
    description: "Rolling SAFE at $7M cap with standard YC terms. Clean cap table, no complex provisions."
  },
  {
    icon: CheckCircle,
    title: "Near-Term Milestones",
    description: "Funds will accelerate product development, expand pilot programs, and drive to revenue."
  }
];

const safeTerms = [
  { label: "Instrument", value: "SAFE (Simple Agreement for Future Equity)" },
  { label: "Valuation Cap", value: "$7,000,000" },
  { label: "Discount", value: "Standard (if applicable at conversion)" },
  { label: "Check Size", value: "$5,000 – $50,000" },
  { label: "Raise Window", value: "Now – January 15" },
  { label: "Investor Rights", value: "Pro-rata rights at Series A (for qualifying investments)" },
  { label: "Conversion", value: "Converts at next priced equity round at the lower of cap or discount" }
];

export default function InvestorPortal() {
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();

  const form = useForm<InsertInvestorInquiry>({
    resolver: zodResolver(insertInvestorInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      checkSize: "",
      accredited: false,
      notes: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertInvestorInquiry) => {
      const response = await apiRequest("POST", "/api/investor-inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Interest Submitted",
        description: "Thank you for your interest in NovaPath. We'll be in touch shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertInvestorInquiry) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1600px_1200px_at_50%_40%,hsl(180,60%,30%,0.25),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-32">
          <motion.div
            className="text-center mb-16"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DollarSign className="h-4 w-4" />
              Rolling SAFE Investment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white" data-testid="text-investor-headline">
              NovaPath Rolling SAFE
            </h1>
            <p className="text-xl md:text-2xl text-teal-400 font-semibold mb-4">
              @ $7M Valuation Cap
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/80">
              <span className="bg-background/50 px-4 py-2 rounded-lg border border-border/50">
                Checks: $5k – $50k
              </span>
              <span className="bg-background/50 px-4 py-2 rounded-lg border border-border/50">
                Rolling raise: {NOVAPATH_CONFIG.raiseWindow}
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <Card className="bg-card/50 border-teal-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Express Your Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                data-testid="input-investor-name"
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                                data-testid="input-investor-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Intended Check Size *</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-3 gap-2">
                                {checkSizeOptions.map((size) => (
                                  <Button
                                    key={size}
                                    type="button"
                                    variant={field.value === size ? "default" : "outline"}
                                    className={field.value === size ? "bg-teal-600 hover:bg-teal-700" : ""}
                                    onClick={() => field.onChange(size)}
                                    data-testid={`button-check-size-${size.replace(/[^0-9]/g, '')}`}
                                  >
                                    {size}
                                  </Button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accredited"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border/50 p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-accredited"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium cursor-pointer">
                                I confirm I am an accredited investor *
                              </FormLabel>
                              <p className="text-xs text-foreground/60">
                                As defined by SEC regulations (net worth over $1M excluding primary residence, or income over $200K/$300K joint)
                              </p>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any questions or comments..."
                                className="resize-none"
                                {...field}
                                data-testid="textarea-investor-notes"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        disabled={mutation.isPending}
                        data-testid="button-submit-investor"
                      >
                        {mutation.isPending ? "Submitting..." : "Submit Interest"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">SAFE Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {safeTerms.map((term, index) => (
                      <div key={index} className="flex justify-between items-start py-3 border-b border-border/30 last:border-0">
                        <span className="text-foreground/70 text-sm">{term.label}</span>
                        <span className="text-white font-medium text-sm text-right max-w-[60%]">{term.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mb-20"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Why NovaPath
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyNovaPathPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="h-full bg-card/50 border-border/50 hover-elevate" data-testid={`why-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                          <point.icon className="h-5 w-5 text-teal-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                          <p className="text-sm text-foreground/70">{point.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 border-teal-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  Contact Us Directly
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Founder</p>
                      <p className="text-white font-medium">{NOVAPATH_CONFIG.contactName}</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${NOVAPATH_CONFIG.contactEmail}`}
                    className="flex items-center gap-3 hover-elevate rounded-lg p-2 -m-2"
                    data-testid="link-investor-email"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Email</p>
                      <p className="text-white font-medium">{NOVAPATH_CONFIG.contactEmail}</p>
                    </div>
                  </a>
                  <a
                    href={`tel:${NOVAPATH_CONFIG.contactPhone}`}
                    className="flex items-center gap-3 hover-elevate rounded-lg p-2 -m-2"
                    data-testid="link-investor-phone"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Phone</p>
                      <p className="text-white font-medium">{NOVAPATH_CONFIG.contactPhone}</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
