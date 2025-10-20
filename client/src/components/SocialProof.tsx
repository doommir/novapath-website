import { Card } from "@/components/ui/card";
import { School, BookOpen, GraduationCap, Users } from "lucide-react";

const logos = [
  { icon: School, name: "District Logo 1" },
  { icon: BookOpen, name: "Charter Logo 2" },
  { icon: GraduationCap, name: "School Logo 3" },
  { icon: Users, name: "Education Logo 4" },
];

export default function SocialProof() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="flex justify-center items-center gap-8 md:gap-12 mb-6 flex-wrap">
            {logos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div 
                  key={index} 
                  className="opacity-40 hover:opacity-60 transition-opacity"
                  data-testid={`logo-${index + 1}`}
                >
                  <Icon className="h-8 w-8 md:h-10 md:w-10 text-foreground" />
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground font-medium" data-testid="text-social-proof">
            Pilot-ready for charter and district teams.
          </p>
        </div>
      </div>
    </section>
  );
}
