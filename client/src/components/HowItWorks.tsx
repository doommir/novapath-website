import { Card, CardContent } from "@/components/ui/card";
import { Link2, Zap, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect your data & tools",
    description: "Seamlessly integrate with your existing systems—SIS, LMS, and communication platforms.",
  },
  {
    icon: Zap,
    title: "Automate routine tasks",
    description: "Free up time with AI-powered workflows for attendance, grading, and parent communication.",
  },
  {
    icon: BarChart3,
    title: "Track impact in real time",
    description: "Get actionable insights through intuitive dashboards that show what's working.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4" data-testid="text-section-label">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-how-it-works-title">
            Three steps to transform your school operations
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} data-testid={`card-step-${index + 1}`} className="hover-elevate bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid={`text-step-title-${index + 1}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-step-description-${index + 1}`}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
