import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InvestorPortalEmbed() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1337") {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isUnlocked) {
    return (
      <div className="w-full h-screen flex flex-col">
        <iframe
          src="https://investor-portal--novapath.replit.app"
          className="w-full flex-1 border-none"
          title="NovaPath Investor Portal"
          data-testid="iframe-investor-portal"
          allowFullScreen
        />
        <footer className="bg-black/90 border-t border-border/30 px-6 py-4">
          <p className="text-xs text-foreground/50 text-center max-w-4xl mx-auto">
            This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy securities. Any offering, if made, will be conducted pursuant to Rule 506(b) of Regulation D and shared privately through definitive legal documentation.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        src="https://investor-portal--novapath.replit.app"
        className="w-full h-full border-none blur-lg pointer-events-none"
        title="NovaPath Investor Portal"
        data-testid="iframe-investor-portal-blurred"
        allowFullScreen
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6">
        <div className="text-center max-w-lg">
          <h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            data-testid="text-early-supporters"
          >
            Early Supporters
          </h1>
          <p className="text-lg text-white/90 mb-4">
            NovaPath is backed by a small group of early supporters and strategic angels.
          </p>
          <p className="text-base text-white/70 mb-8">
            We are not publicly soliciting investment.<br />
            Any potential offering is shared privately with individuals with whom we have a pre-existing relationship.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center ${error ? "border-red-500" : ""}`}
              data-testid="input-investor-password"
            />
            {error && (
              <p className="text-red-400 text-sm">Incorrect password</p>
            )}
            <Button 
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              data-testid="button-submit-password"
            >
              Access Portal
            </Button>
          </form>

          <div className="border-t border-white/20 pt-6">
            <a 
              href="mailto:founder@novapath.ai?subject=Conversation%20Request"
              className="inline-block"
            >
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                data-testid="button-request-conversation"
              >
                Request a Conversation
              </Button>
            </a>
          </div>
        </div>
        
        <footer className="absolute bottom-0 left-0 right-0 bg-black/50 px-6 py-4">
          <p className="text-xs text-white/50 text-center max-w-4xl mx-auto">
            This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy securities. Any offering, if made, will be conducted pursuant to Rule 506(b) of Regulation D and shared privately through definitive legal documentation.
          </p>
        </footer>
      </div>
    </div>
  );
}
