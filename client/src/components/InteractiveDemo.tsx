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
import { useRealtimeAPI } from "@/hooks/useRealtimeAPI";

type DemoStep = "welcome" | "initial_checkin" | "peer_checkins" | "ask_more" | "listening_more" | "realtime_conversation" | "results" | "review" | "complete";

const sampleInitialResponse = `I'm Alex and I'm feeling stressed`;
const sampleDetailedResponse = `I'm worried about the science fair project. My partner and I are working together but we're falling behind and I don't know if we'll finish in time.`;

const mockPeerCheckins = [
  { name: "Marcus", feeling: "overwhelmed", detail: "I'm Marcus and I'm feeling overwhelmed with all the assignments this week" },
  { name: "Jordan", feeling: "excited", detail: "I'm Jordan and I'm feeling excited about the basketball game tomorrow" }
];

export function InteractiveDemo() {
  const [step, setStep] = useState<DemoStep>("welcome");
  const [userName, setUserName] = useState("");
  const [initialCheckIn, setInitialCheckIn] = useState("");
  const [detailedCheckIn, setDetailedCheckIn] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [usedVoice, setUsedVoice] = useState(false);
  const [enableRealtimeMode, setEnableRealtimeMode] = useState(false); // Toggle for Realtime API
  const [realtimeTranscript, setRealtimeTranscript] = useState("");
  const [validationText, setValidationText] = useState("");
  const [peerPrompts, setPeerPrompts] = useState<Array<{peerName: string; prompt: string}>>([]);
  const [resultsIntro, setResultsIntro] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [aiResults, setAiResults] = useState({
    attendance: {
      student: "",
      status: "Present",
      timestamp: "8:15 AM",
      mood: "",
      engagement: "Vocal about concerns"
    },
    counselorAlert: {
      student: "",
      priority: "Medium",
      category: "Academic Stress",
      details: "",
      suggestedAction: "Brief check-in to assess stress levels and offer support",
      autoApproved: false
    },
    peerSupport: {
      detected: "",
      concern: "",
      suggestions: [
        {
          type: "Partner Check-In",
          description: ""
        }
      ],
      autoApproved: false
    }
  });
  const processingTimeoutRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const lastTranscriptRef = useRef<string>("");

  // Initialize Realtime API hook
  const realtimeAPI = useRealtimeAPI({
    onAudioReceived: (audioData: ArrayBuffer) => {
      console.log('Received audio chunk:', audioData.byteLength, 'bytes');
    },
    onTranscriptReceived: (transcript: string) => {
      setRealtimeTranscript(prev => prev + transcript);
      console.log('AI transcript:', transcript);
    },
    onError: (error: string) => {
      console.error('Realtime API error:', error);
      // Fallback to traditional flow
      setEnableRealtimeMode(false);
    },
    onConnected: () => {
      console.log('Realtime API connected');
    },
    onDisconnected: () => {
      console.log('Realtime API disconnected');
    }
  });

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

        const newTranscript = (finalTranscript + interimTranscript).trim();
        setTranscript(newTranscript);
        lastTranscriptRef.current = newTranscript;
        
        // Clear existing silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
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
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      TTS.stop();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Silence detection effect - auto-submit after 2 seconds of silence (or when sample used)
  useEffect(() => {
    if (transcript.length > 10) {
      // Clear existing timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      
      // Set new silence detection timer
      // If listening (voice), wait 2 seconds; if sample/typed, submit immediately
      const delay = isListening ? 2000 : 100;
      
      silenceTimerRef.current = window.setTimeout(() => {
        if (step === "initial_checkin") {
          handleSubmitInitialCheckIn();
        } else if (step === "listening_more") {
          handleSubmitDetailedCheckIn();
        }
      }, delay);
    }
    
    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [transcript, isListening, step]);

  const handleStart = async () => {
    setStep("initial_checkin");
    await TTS.say("Welcome to group check-in. Please share your name and how you're feeling today in one word.", { rate: 1.1, pitch: 1.0 });
    
    // Auto-start listening after AI speaks
    if (recognitionRef.current) {
      setTranscript("");
      setIsListening(true);
      setUsedVoice(true);
      recognitionRef.current.start();
    }
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
    if (step === "initial_checkin") {
      setTranscript(sampleInitialResponse);
    } else if (step === "listening_more") {
      setTranscript(sampleDetailedResponse);
    }
    setUsedVoice(false);
  };

  const handleSubmitInitialCheckIn = async () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    // Clear silence timer
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    // Extract name from initial check-in
    const nameMatch = transcript.match(/I'?m\s+([A-Z][a-z]+)/i);
    const extractedName = nameMatch ? nameMatch[1] : "Student";
    setUserName(extractedName);
    setInitialCheckIn(transcript);
    
    // Quick acknowledgment
    const acknowledgments = ["Got it", "Thanks", "Okay", "I hear you"];
    const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
    await TTS.say(ack, { rate: 1.2, pitch: 1.0 });
    
    // Show peer check-ins (displayed but not spoken)
    setStep("peer_checkins");
    
    // Wait for user to see peer check-ins (no audio)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Skip "ask_more" step - go directly to listening_more
    setStep("listening_more");
    setTranscript("");
    
    // Ask user to share more and auto-start listening
    const prompts = [
      `${extractedName}, wanna share more about that?`,
      `Tell me more, ${extractedName}`,
      `What's going on, ${extractedName}?`,
      `${extractedName}, can you say more about how you're feeling?`
    ];
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    await TTS.say(prompt, { rate: 1.1, pitch: 1.0 });
    
    // Auto-start listening after AI speaks
    if (recognitionRef.current) {
      setIsListening(true);
      setUsedVoice(true);
      recognitionRef.current.start();
    }
  };

  const handleSubmitDetailedCheckIn = async () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    // Clear silence timer
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    setDetailedCheckIn(transcript);
    
    // Quick verbal acknowledgment while processing
    const acknowledgments = ["Mm-hmm", "I see", "Okay", "Got it"];
    const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
    TTS.say(ack, { rate: 1.2, pitch: 1.0 }); // Don't await - let it play in background
    
    try {
      // Parallelize all API calls for speed
      const [validationResponse, promptsResponse, resultsResponse] = await Promise.all([
        fetch('/api/demo/validate-emotion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkIn: transcript, studentName: userName })
        }),
        fetch('/api/demo/peer-prompts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkIn: transcript, studentName: userName, peerNames: ['Marcus'] })
        }),
        fetch('/api/demo/results-intro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkIn: transcript })
        })
      ]);
      
      if (!validationResponse.ok || !promptsResponse.ok || !resultsResponse.ok) {
        throw new Error('API call failed');
      }
      
      const [validationData, promptsData, resultsData] = await Promise.all([
        validationResponse.json(),
        promptsResponse.json(),
        resultsResponse.json()
      ]);
      
      setValidationText(validationData.validation);
      setPeerPrompts(promptsData.prompts || []);
      setResultsIntro(resultsData.intro);
      
      // Speak validation with sentiment-aware tone
      const sentiment = validationData.sentiment || 'neutral';
      let ttsParams = { rate: 1.1, pitch: 1.0 };
      
      if (sentiment === 'negative') {
        // Warmer, slower for empathy
        ttsParams = { rate: 1.05, pitch: 1.05 };
      } else if (sentiment === 'positive') {
        // More upbeat
        ttsParams = { rate: 1.15, pitch: 1.08 };
      }
      
      await TTS.say(validationData.validation, ttsParams);
      
      // Update AI results with user's name
      setAiResults(prev => ({
        attendance: { ...prev.attendance, student: userName, mood: initialCheckIn },
        counselorAlert: { ...prev.counselorAlert, student: userName, details: transcript },
        peerSupport: { ...prev.peerSupport, detected: transcript }
      }));
      
      // Go straight to results - no intermediate steps!
      setStep("results");
      
      // Natural conversational intro
      const intros = [
        `Alright, here's what I'm noticing`,
        `Okay, so here's what stands out`,
        `Let me share what I'm seeing`,
        `Here's what caught my attention`
      ];
      const intro = intros[Math.floor(Math.random() * intros.length)];
      await TTS.say(intro, { rate: 1.1, pitch: 1.0 });
      
    } catch (error) {
      console.error('Error in check-in flow:', error);
      setStep("results");
    }
  };

  const handleReview = async () => {
    try {
      // Get review message
      const reviewResponse = await fetch('/api/demo/review-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: userName })
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
    setUserName("");
    setInitialCheckIn("");
    setDetailedCheckIn("");
    setTranscript("");
    setIsListening(false);
    setUsedVoice(false);
    setValidationText("");
    setPeerPrompts([]);
    setResultsIntro("");
    setReviewMessage("");
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
              disabled
              className="text-lg px-8 shadow-lg"
              data-testid="button-start-checkin"
            >
              Coming Soon
              <Volume2 className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === "initial_checkin" && (
          <motion.div
            key="initial_checkin"
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
                <h3 className="text-xl md:text-2xl font-bold" data-testid="text-initial-title">
                  Group Check-In
                </h3>
              </div>
            </div>

            <Card className="p-6 space-y-4">
              <div className="text-center space-y-4">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={useSample}
                  data-testid="button-use-sample"
                >
                  Use Sample Response
                </Button>
                {!recognitionRef.current && (
                  <p className="text-xs text-muted-foreground">
                    Voice input not available in this browser. Use sample response or type below.
                  </p>
                )}
              </div>

              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[100px] text-base"
                placeholder="Listening... (or type your response)"
                data-testid="input-transcript"
                readOnly={isListening}
              />

              {isListening && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>Listening... (will auto-submit after 2 seconds of silence)</span>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {step === "peer_checkins" && (
          <motion.div
            key="peer_checkins"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20 mb-3">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold" data-testid="text-peers-title">
                Other Students Checking In
              </h3>
            </div>

            <div className="grid gap-3 max-w-2xl mx-auto">
              {mockPeerCheckins.map((peer, idx) => (
                <Card key={idx} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1.5 text-sm">{peer.name}</h4>
                      <p className="text-sm italic text-muted-foreground">
                        "{peer.detail}"
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}


        {step === "listening_more" && (
          <motion.div
            key="listening_more"
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
                <h3 className="text-xl md:text-2xl font-bold" data-testid="text-listeningmore-title">
                  Listening...
                </h3>
              </div>
            </div>

            <Card className="p-6 space-y-4">
              <div className="text-center space-y-4">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={useSample}
                  data-testid="button-use-sample-more"
                >
                  Use Sample Response
                </Button>
                {!recognitionRef.current && (
                  <p className="text-xs text-muted-foreground">
                    Voice input not available in this browser. Use sample response or type below.
                  </p>
                )}
              </div>

              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[120px] text-base"
                placeholder="Listening... (or type your response)"
                data-testid="input-transcript-more"
                readOnly={isListening}
              />

              {isListening && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>Listening... (will auto-submit after 2 seconds of silence)</span>
                </div>
              )}
            </Card>
          </motion.div>
        )}


        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
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
              {resultsIntro && (
                <p className="text-base mb-2" data-testid="text-results-intro">
                  {resultsIntro}
                </p>
              )}
              <p className="text-muted-foreground text-sm" data-testid="text-results-subtitle">
                Here's complete transparency on what happens next:
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
              {reviewMessage && (
                <p className="text-base mb-2" data-testid="text-review-message">
                  {reviewMessage}
                </p>
              )}
              <p className="text-muted-foreground text-sm" data-testid="text-review-subtitle">
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
                        Should the counselor be notified about {userName}'s concerns?
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
                        Should {userName} and their partner have a facilitated check-in?
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="button-decline-peer">Decline</Button>
                        <Button size="sm" className="text-xs" data-testid="button-approve-peer">Approve & Schedule</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-2">
                    <Button 
                      onClick={handleApprove}
                      className="w-full"
                      data-testid="button-complete-review"
                    >
                      Complete Review
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20"
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-complete-title">
                That's How NovaPath Works
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI handles the details. Humans stay in control. Every student gets heard.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleRestart}
              variant="outline"
              data-testid="button-restart-demo"
            >
              Try Again
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
