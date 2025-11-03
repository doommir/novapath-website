// Optimized browser TTS with natural voice selection and humanized speech
export const TTS = (() => {
  let voices: SpeechSynthesisVoice[] = [];
  const preferred = [
    // Edge/Windows - best quality
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Jenny Online (Natural) - English (United States)",
    "Microsoft Guy Online (Natural) - English (United States)",
    // macOS Safari
    "Samantha (Enhanced)", 
    "Ava (Enhanced)",
    "Alex",
    // Chrome generic
    "Google US English"
  ];

  function pickVoice(lang = "en-US"): SpeechSynthesisVoice | null {
    const list = speechSynthesis.getVoices().filter(v => v.lang.startsWith(lang));
    
    // 1) Exact preferred match
    for (const name of preferred) {
      const v = list.find(x => x.name.includes(name));
      if (v) return v;
    }
    
    // 2) Any with "Natural"
    const nat = list.find(v => /natural/i.test(v.name));
    if (nat) return nat;
    
    // 3) First sane fallback
    return list[0] || null;
  }

  function warmup(cb: () => void) {
    // Voices are async-populated in many browsers
    voices = speechSynthesis.getVoices();
    if (voices.length) return cb();
    speechSynthesis.onvoiceschanged = () => { 
      voices = speechSynthesis.getVoices(); 
      cb(); 
    };
  }

  function say(
    text: string, 
    { rate = 0.95, pitch = 0.95, volume = 1, lang = "en-US" } = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = rate;
      u.pitch = pitch;
      u.volume = volume;
      u.voice = pickVoice(lang);
      
      u.onend = () => resolve();
      u.onerror = () => resolve(); // Still resolve on error to not block flow
      
      speechSynthesis.cancel(); // Avoid queue buildup
      speechSynthesis.speak(u);
    });
  }

  // Insert breathable pauses + human-ish pacing
  function humanize(s: string): string {
    // Micro-pauses
    s = s
      .replace(/, /g, ", … ")
      .replace(/: /g, " — ")
      .replace(/\.\s/g, ".  ")
      .replace(/\? /g, "?  ");
    
    // Mild contraction normalization (reads friendlier)
    s = s.replace(/\bI am\b/g, "I'm");
    s = s.replace(/\byou are\b/g, "you're");
    s = s.replace(/\bwe are\b/g, "we're");
    
    return s;
  }

  async function speakGreeting(name: string) {
    const greetings = [
      `Good morning, ${name}.`,
      `Hey ${name}, good to see you.`,
      `Hi ${name}.`
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const prompt = "How are you feeling today? What's on your mind?";
    await say(humanize(`${greeting} ${prompt}`), { rate: 0.92, pitch: 0.93 });
  }

  async function speakValidation(validationText: string) {
    await say(humanize(validationText), { rate: 0.91, pitch: 0.92 });
  }
  
  async function speakPeerPrompt(promptText: string) {
    await say(humanize(promptText), { rate: 0.92, pitch: 0.93 });
  }

  async function speakResults(introText: string) {
    await say(humanize(introText), { rate: 0.93, pitch: 0.93 });
  }

  async function speakReview(reviewText: string) {
    await say(humanize(reviewText), { rate: 0.91, pitch: 0.92 });
  }

  function stop() {
    speechSynthesis.cancel();
  }

  return { 
    warmup, 
    say, 
    humanize, 
    speakGreeting, 
    speakValidation,
    speakPeerPrompt,
    speakResults, 
    speakReview,
    stop 
  };
})();
