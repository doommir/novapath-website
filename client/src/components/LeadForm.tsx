import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Button } from "@/components/ui/button";
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
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

const roles = [
  { value: "principal", label: "Principal" },
  { value: "teacher", label: "Teacher" },
  { value: "coach", label: "Coach" },
  { value: "it", label: "IT" },
  { value: "data", label: "Data" },
];

interface LeadFormProps {
  prefillEmail?: string;
}

export default function LeadForm({ prefillEmail }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [referrer, setReferrer] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferrer(ref);
    }
  }, []);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      email: prefillEmail || "",
      role: "",
      school: "",
      referrer: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const payload = { ...data, referrer: referrer || data.referrer };
      return apiRequest("POST", "/api/leads", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <motion.div 
        className="mx-auto max-w-md rounded-lg bg-chart-3/10 border border-chart-3/30 p-6 text-center backdrop-blur-sm shadow-lg"
        data-testid="message-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="h-12 w-12 text-chart-3 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">✅ You're in. Your first automation prompt is on its way.</h3>
        <p className="text-muted-foreground">
          Check your inbox in 60 seconds.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-md relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl" />
      <div className="relative bg-card/30 backdrop-blur-md border border-border/50 rounded-xl p-6 shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-email">Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@school.edu"
                      data-testid="input-email"
                      {...field}
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
                  <FormLabel data-testid="label-role">Role *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem 
                          key={role.value} 
                          value={role.value}
                          data-testid={`option-role-${role.value}`}
                        >
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-school">School/District (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name of your school or district"
                      data-testid="input-school"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
              data-testid="button-submit"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Join the Waitlist"
              )}
            </Button>

            {mutation.isError && (
              <div 
                className="flex items-start gap-2 text-sm text-destructive"
                data-testid="message-error"
              >
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Something went wrong—try again or email{" "}
                  <a href="mailto:hello@novapath.ai" className="underline hover:text-destructive-foreground">
                    hello@novapath.ai
                  </a>
                  .
                </p>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center" data-testid="text-privacy-promise">
              We never share your email. One click to unsubscribe.
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
