import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User, Sparkles, UserCheck, ArrowRight, CheckCircle2, AlertTriangle, Users } from "lucide-react";

type DemoStep = "welcome" | "checkin" | "processing" | "results" | "review" | "complete";

// Sample data for the demo
const sampleObservations = `Morning Check-In - Ms. Rodriguez's Class

- Emma Chen: Seemed withdrawn today, didn't engage during morning greeting. Usually very talkative.
- Marcus Johnson: Excited about science fair, mentioned working with Emma's group
- Sarah Kim: Asked if Emma was okay, noticed she was quiet
- Jordan Lee: Normal energy, working on solo project`;

const aiResults = {
  attendance: [
    { name: "Emma Chen", status: "Present", mood: "Withdrawn" },
    { name: "Marcus Johnson", status: "Present", mood: "Engaged" },
    { name: "Sarah Kim", status: "Present", mood: "Concerned" },
    { name: "Jordan Lee", status: "Present", mood: "Normal" }
  ],
  peerMapping: {
    description: "Science fair collaboration detected",
    connections: [
      { student: "Emma Chen", connectedTo: ["Marcus Johnson"], context: "Science fair group" },
      { student: "Marcus Johnson", connectedTo: ["Emma Chen"], context: "Science fair group" },
      { student: "Sarah Kim", connectedTo: ["Emma Chen"], context: "Showing concern" }
    ]
  },
  counselorAlerts: [
    {
      student: "Emma Chen",
      priority: "Medium",
      reason: "Behavioral change: Usually talkative, withdrawn today. Peer noticed and expressed concern.",
      suggestedAction: "Brief check-in to ensure student is okay"
    }
  ]
};

export function InteractiveDemo() {
  const [step, setStep] = useState<DemoStep>("welcome");
  const [observations, setObservations] = useState(sampleObservations);

  const handleStart = () => {
    setStep("checkin");
  };

  const handleSubmitCheckIn = () => {
    setStep("processing");
    // Simulate AI processing time
    setTimeout(() => {
      setStep("results");
    }, 2500);
  };

  const handleReview = () => {
    setStep("review");
  };

  const handleApprove = () => {
    setStep("complete");
  };

  const handleRestart = () => {
    setStep("welcome");
    setObservations(sampleObservations);
  };

  return (
    <div className="w-full max-w-4xl mx-auto" data-testid="container-interactive-demo">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20"
              >
                <User className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-welcome-title">
                Welcome, Principal Rodriguez
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-welcome-subtitle">
                Watch how NovaPath turns a 60-second morning check-in into attendance logs, peer mapping, and counselor alerts — automatically.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleStart}
              className="text-lg px-8 shadow-lg"
              data-testid="button-start-checkin"
            >
              Start Check-In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === "checkin" && (
          <motion.div
            key="checkin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" data-testid="text-checkin-title">
                  Morning Observations
                </h3>
              </div>
              <p className="text-muted-foreground" data-testid="text-checkin-subtitle">
                Share your quick observations from this morning. NovaPath will handle the rest.
              </p>
            </div>
            <Card className="p-6">
              <Textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="min-h-[200px] text-base"
                placeholder="Enter your observations..."
                data-testid="input-observations"
              />
            </Card>
            <div className="flex justify-end">
              <Button 
                size="lg" 
                onClick={handleSubmitCheckIn}
                data-testid="button-submit-checkin"
              >
                Process with AI
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8 py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20"
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-processing-title">
                AI Processing Your Observations
              </h3>
              <div className="space-y-2 max-w-md mx-auto">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  ✓ Extracting attendance data...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-muted-foreground"
                >
                  ✓ Mapping peer relationships...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-muted-foreground"
                >
                  ✓ Identifying support opportunities...
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" data-testid="text-results-title">
                  AI-Generated Insights
                </h3>
              </div>
              <p className="text-muted-foreground" data-testid="text-results-subtitle">
                Review what NovaPath extracted from your 60-second check-in
              </p>
            </div>

            <div className="grid gap-4">
              {/* Attendance Log */}
              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Attendance Log
                </h4>
                <div className="space-y-2">
                  {aiResults.attendance.map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{student.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{student.mood}</span>
                        <span className="text-sm text-green-600">{student.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Peer Mapping */}
              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Peer Mapping
                </h4>
                <p className="text-sm text-muted-foreground mb-3">{aiResults.peerMapping.description}</p>
                <div className="space-y-2">
                  {aiResults.peerMapping.connections.map((conn, idx) => (
                    <div key={idx} className="py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{conn.student}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span>{conn.connectedTo.join(", ")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{conn.context}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Counselor Alerts */}
              <Card className="p-6 border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Counselor Alert
                </h4>
                {aiResults.counselorAlerts.map((alert, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{alert.student}</span>
                      <span className="text-sm px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                        {alert.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm">{alert.reason}</p>
                    <p className="text-sm text-muted-foreground italic">
                      Suggested: {alert.suggestedAction}
                    </p>
                  </div>
                ))}
              </Card>
            </div>

            <div className="flex justify-end">
              <Button 
                size="lg" 
                onClick={handleReview}
                data-testid="button-review-results"
              >
                Review & Approve
                <UserCheck className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" data-testid="text-review-title">
                  Human Review
                </h3>
              </div>
              <p className="text-muted-foreground" data-testid="text-review-subtitle">
                You always have the final say. AI suggests, humans decide.
              </p>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <p className="text-base">
                  The AI has identified that <strong>Emma Chen</strong> may benefit from a brief check-in based on observed behavioral changes and peer concern.
                </p>
                <p className="text-sm text-muted-foreground">
                  This suggestion is based on:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Behavioral shift from normal pattern</li>
                  <li>Peer awareness and concern</li>
                  <li>No immediate crisis indicators</li>
                </ul>
                <p className="text-base font-medium">
                  Do you approve this alert being sent to the counselor?
                </p>
              </div>
            </Card>

            <div className="flex gap-4 justify-end">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleRestart}
                data-testid="button-decline"
              >
                Decline
              </Button>
              <Button 
                size="lg" 
                onClick={handleApprove}
                data-testid="button-approve"
              >
                Approve & Send
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-6 py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 border-2 border-green-600"
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-complete-title">
                Workflow Complete
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                That's how NovaPath works: <strong>Human moments</strong> drive the input, <strong>AI handles</strong> the processing, and <strong>humans make</strong> the final call.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleRestart}
                data-testid="button-try-again"
              >
                Try Again
              </Button>
              <Button 
                size="lg"
                onClick={() => {
                  document.querySelector('[data-testid="button-join-waitlist"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                data-testid="button-get-template"
              >
                Get Your Free Check-In Template
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
