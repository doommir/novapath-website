import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Sparkles, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Users,
  Mic,
  MicOff,
  Volume2,
  Clock
} from "lucide-react";
import { TTS } from "@/lib/tts";

type DemoStep = "welcome" | "listening" | "validating" | "facilitating" | "processing" | "results" | "review" | "complete";

const sampleStudentResponse = `I'm feeling kinda stressed about the science fair. Marcus and I are working together but I'm worried we're falling behind. We have so much to do and I don't know if we'll finish in time.`;

const aiResults = {
  attendance: {
    student: "Maya Chen",
    status: "Present",
    timestamp: "8:15 AM",
    mood: "Stressed/Concerned",
    engagement: "Vocal about concerns"
  },
  counselorAlert: {
    student: "Maya Chen",
    priority: "Medium",
    category: "Academic Stress",
    details: "Student expressing project-related stress and time pressure around science fair deadline",
    suggestedAction: "Brief check-in to assess stress levels and offer time management support",
    autoApproved: false
  },
  peerSupport: {
    detected: "Collaboration with Marcus on science fair project",
    concern: "Partnership experiencing deadline pressure",
    suggestions: [
      {
        type: "Partner Check-In",
        description: "Facilitate conversation between Maya and Marcus to align on timeline and divide tasks"
      },
      {
        type: "Peer Mentorship",
        description: "Connect Maya with Jordan Lee (completed science fair early) for advice and encouragement"
      }
    ],
    autoApproved: false
  }
};

export function InteractiveDemo() {
  const [step, setStep] = useState<DemoStep>("welcome");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [usedVoice, setUsedVoice] = useState(false);
  const [validationText, setValidationText] = useState("");
  const [peerPrompts, setPeerPrompts] = useState<Array<{peerName: string; prompt: string}>>([]);
  const [resultsIntro, setResultsIntro] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const processingTimeoutRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Warmup TTS
    TTS.warmup(() => {
      console.log("TTS ready");
    });

    // Setup speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript((finalTranscript + interimTranscript).trim());
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      TTS.stop();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleStart = async () => {
    setStep("listening");
    await TTS.speakGreeting("Maya");
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setIsListening(true);
      setUsedVoice(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const useSample = () => {
    setTranscript(sampleStudentResponse);
    setUsedVoice(false);
  };

  const handleSubmitCheckIn = async () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    // Step 1: Validate emotion
    setStep("validating");
    
    try {
      // Call API to get emotional validation
      const validationResponse = await fetch('/api/demo/validate-emotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          checkIn: transcript, 
          studentName: 'Maya' 
        })
      });
      
      if (!validationResponse.ok) {
        throw new Error('Failed to get validation response');
      }
      
      const validationData = await validationResponse.json();
      setValidationText(validationData.validation);
      
      // Speak the validation
      await TTS.speakValidation(validationData.validation);
      
      // Wait to ensure validation screen is visible
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Facilitate peer support
      setStep("facilitating");
      
      // Call API to get peer prompts
      const promptsResponse = await fetch('/api/demo/peer-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          checkIn: transcript, 
          peerNames: ['Marcus', 'Jordan'] 
        })
      });
      
      if (!promptsResponse.ok) {
        throw new Error('Failed to get peer prompts');
      }
      
      const promptsData = await promptsResponse.json();
      setPeerPrompts(promptsData.prompts || []);
      
      // Speak peer prompts
      for (const prompt of promptsData.prompts || []) {
        await TTS.speakPeerPrompt(prompt.prompt);
      }
      
      // Wait to ensure facilitation screen is visible
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: Process workflows
      setStep("processing");
      
      // Wait to show processing animation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Step 4: Get results intro
      const resultsResponse = await fetch('/api/demo/results-intro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkIn: transcript })
      });
      
      if (!resultsResponse.ok) {
        throw new Error('Failed to get results intro');
      }
      
      const resultsData = await resultsResponse.json();
      setResultsIntro(resultsData.intro);
      
      setStep("results");
      await TTS.speakResults(resultsData.intro);
    } catch (error) {
      console.error('Error in check-in flow:', error);
      // Fallback to results on error
      setStep("results");
    }
  };

  const handleReview = async () => {
    try {
      // Get review message
      const reviewResponse = await fetch('/api/demo/review-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: 'Maya' })
      });
      
      if (!reviewResponse.ok) {
        throw new Error('Failed to get review message');
      }
      
      const reviewData = await reviewResponse.json();
      setReviewMessage(reviewData.message);
      
      setStep("review");
      await TTS.speakReview(reviewData.message);
    } catch (error) {
      console.error('Error in review flow:', error);
      // Fallback to review screen with default message
      setReviewMessage("Your teacher will review this before anything happens.");
      setStep("review");
      await TTS.speakReview("Your teacher will review this before anything happens.");
    }
  };

  const handleApprove = () => {
    setStep("complete");
  };

  const handleRestart = () => {
    setStep("welcome");
    setTranscript("");
    setIsListening(false);
    setUsedVoice(false);
    TTS.stop();
  };

  const hasTranscript = transcript.length > 10;

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
                Experience NovaPath as a Student
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-welcome-subtitle">
                Click below to start a voice check-in. You'll speak naturally, and see how NovaPath processes your words with complete transparency.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleStart}
              className="text-lg px-8 shadow-lg"
              data-testid="button-start-checkin"
            >
              Start Voice Check-In
              <Volume2 className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === "listening" && (
          <motion.div
            key="listening"
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
                <h3 className="text-xl md:text-2xl font-bold" data-testid="text-listening-title">
                  Morning Check-In
                </h3>
              </div>
              <p className="text-muted-foreground" data-testid="text-listening-subtitle">
                The AI just asked: "Good morning, Maya. How are you feeling today? What's on your mind?"
              </p>
            </div>

            <Card className="p-6 space-y-4">
              {!hasTranscript && (
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">Choose how to respond:</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      variant={isListening ? "default" : "outline"}
                      onClick={isListening ? stopListening : startListening}
                      disabled={!recognitionRef.current}
                      data-testid="button-voice-input"
                    >
                      {isListening ? <Mic className="mr-2 h-5 w-5 animate-pulse" /> : <MicOff className="mr-2 h-5 w-5" />}
                      {isListening ? "Listening..." : "Speak Your Response"}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={useSample}
                      data-testid="button-use-sample"
                    >
                      Use Sample Response
                    </Button>
                  </div>
                  {!recognitionRef.current && (
                    <p className="text-xs text-muted-foreground">
                      Voice input not available in this browser. Use sample response or type below.
                    </p>
                  )}
                </div>
              )}

              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[150px] text-base"
                placeholder="Or type your response here..."
                data-testid="input-transcript"
              />

              {isListening && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>Listening to your voice...</span>
                </div>
              )}
            </Card>

            <div className="flex justify-end">
              <Button 
                size="lg" 
                onClick={handleSubmitCheckIn}
                disabled={!hasTranscript}
                data-testid="button-submit-checkin"
              >
                Submit Check-In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "validating" && (
          <motion.div
            key="validating"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8 py-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20"
            >
              <Volume2 className="w-10 h-10 text-primary" />
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-validating-title">
                AI Validating Your Emotion
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic" data-testid="text-validation">
                "{validationText || 'I hear you\'re feeling stressed, Maya. That\'s completely valid when you\'re working on big projects.'}"
              </p>
            </div>
          </motion.div>
        )}

        {step === "facilitating" && (
          <motion.div
            key="facilitating"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-facilitating-title">
                AI Facilitating Peer Support
              </h3>
              <p className="text-muted-foreground">
                The AI is prompting your groupmates to share their perspectives
              </p>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {peerPrompts.map((prompt, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{prompt.peerName}</h4>
                      <p className="text-sm italic text-muted-foreground">
                        "{prompt.prompt}"
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
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
                AI Processing Your Check-In
              </h3>
              <div className="space-y-2 max-w-md mx-auto">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  ✓ Logging attendance automatically...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-muted-foreground"
                >
                  ✓ Analyzing mood and support needs...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-muted-foreground"
                >
                  ✓ Identifying peer connections...
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
                  What the AI Created
                </h3>
              </div>
              <p className="text-muted-foreground" data-testid="text-results-subtitle">
                Your check-in triggered three automated workflows. Here's complete transparency on what happens next:
              </p>
            </div>

            <div className="grid gap-4">
              {/* Attendance Log */}
              <Card className="p-6 border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Attendance Logged
                  </h4>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    Auto-Approved
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Student:</span>
                    <p className="font-medium">{aiResults.attendance.student}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-green-600">{aiResults.attendance.status}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {aiResults.attendance.timestamp}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mood:</span>
                    <p className="font-medium">{aiResults.attendance.mood}</p>
                  </div>
                </div>
              </Card>

              {/* Counselor Alert */}
              <Card className="p-6 border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Counselor Alert Created
                  </h4>
                  <span className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                    Needs Review
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Priority:</span>
                    <p className="font-medium">{aiResults.counselorAlert.priority} - {aiResults.counselorAlert.category}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">AI Detected:</span>
                    <p>{aiResults.counselorAlert.details}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Suggested Action:</span>
                    <p className="italic">{aiResults.counselorAlert.suggestedAction}</p>
                  </div>
                </div>
              </Card>

              {/* Peer Support */}
              <Card className="p-6 border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Peer Support Opportunities
                  </h4>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    Needs Review
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Detected:</span>
                    <p className="font-medium">{aiResults.peerSupport.detected}</p>
                    <p className="text-xs mt-1">{aiResults.peerSupport.concern}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">AI Suggestions:</span>
                    <div className="space-y-2 mt-2">
                      {aiResults.peerSupport.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="pl-3 border-l-2 border-blue-300 dark:border-blue-700">
                          <p className="font-medium">{suggestion.type}</p>
                          <p className="text-xs">{suggestion.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button 
                size="lg" 
                onClick={handleReview}
                data-testid="button-review-results"
              >
                See Teacher Review
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
                  Human Oversight in Action
                </h3>
              </div>
              <p className="text-muted-foreground" data-testid="text-review-subtitle">
                Ms. Rodriguez reviews everything before action. AI suggests, humans decide.
              </p>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <p className="text-base font-medium">
                  Ms. Rodriguez's Dashboard:
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-green-50/50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Attendance: Already logged</p>
                      <p className="text-xs text-muted-foreground">This happens automatically—no review needed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-card rounded border">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Counselor Alert: Awaiting approval</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Should the counselor be notified about Maya's stress?
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="button-decline-counselor">Decline</Button>
                        <Button size="sm" className="text-xs" data-testid="button-approve-counselor">Approve & Send</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-card rounded border">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Peer Support: Awaiting approval</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Which peer support actions should be taken?
                      </p>
                      <div className="space-y-1 mt-2">
                        <label className="flex items-center gap-2 text-xs">
                          <input type="checkbox" className="rounded" data-testid="checkbox-peer-support-checkin" />
                          <span>Facilitate Maya-Marcus check-in</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs">
                          <input type="checkbox" className="rounded" data-testid="checkbox-peer-support-mentor" />
                          <span>Connect Maya with Jordan (mentor)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground italic">
                    Nothing happens until a human reviews and approves. The AI processes and suggests—the teacher decides.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-4 justify-end">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleRestart}
                data-testid="button-restart"
              >
                Try Again
              </Button>
              <Button 
                size="lg" 
                onClick={handleApprove}
                data-testid="button-complete-demo"
              >
                Complete Demo
                <ArrowRight className="ml-2 h-5 w-5" />
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
                That's NovaPath
              </h3>
              <div className="text-lg text-muted-foreground max-w-2xl mx-auto space-y-3">
                <p>
                  <strong>One student check-in</strong> (30 seconds of voice)
                </p>
                <p>
                  Generated <strong>three automated workflows</strong>:
                </p>
                <ul className="text-base space-y-1">
                  <li>✓ Attendance logged instantly</li>
                  <li>✓ Counselor alert created (pending review)</li>
                  <li>✓ Peer support suggestions queued (pending review)</li>
                </ul>
                <p className="pt-2">
                  <strong>Humans stay in control.</strong> The AI processes and suggests—educators decide.
                </p>
              </div>
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
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
