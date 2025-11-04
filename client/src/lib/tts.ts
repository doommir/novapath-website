// TTS with OpenAI audio and browser fallback
export const TTS = (() => {
  let voices: SpeechSynthesisVoice[] = [];
  let useOpenAI = true; // Try OpenAI first
  
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

  // Browser TTS as fallback
  function sayBrowser(
    text: string, 
    { rate = 1.15, pitch = 1.0, volume = 1, lang = "en-US" } = {}
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

  // OpenAI TTS
  async function sayOpenAI(text: string): Promise<void> {
    try {
      const response = await fetch('/api/demo/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'nova' })
      });

      if (!response.ok) {
        throw new Error('TTS API failed');
      }

      const data = await response.json();
      
      if (data.useBrowserTTS || !data.audio) {
        // Fallback to browser if OpenAI not available
        useOpenAI = false;
        return sayBrowser(text);
      }

      // Decode base64 and play audio
      const audioBlob = base64ToBlob(data.audio, 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      return new Promise((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          useOpenAI = false;
          resolve();
        };
        audio.play();
      });
    } catch (error) {
      console.error('OpenAI TTS error, falling back to browser:', error);
      useOpenAI = false;
      return sayBrowser(text);
    }
  }

  function base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  async function say(
    text: string, 
    { rate = 1.15, pitch = 1.0, volume = 1, lang = "en-US" } = {}
  ): Promise<void> {
    if (useOpenAI) {
      return sayOpenAI(text);
    }
    return sayBrowser(text, { rate, pitch, volume, lang });
  }

  // Light text normalization for natural speech
  function humanize(s: string): string {
    // Use contractions for friendlier tone
    s = s.replace(/\bI am\b/gi, "I'm");
    s = s.replace(/\byou are\b/gi, "you're");
    s = s.replace(/\bwe are\b/gi, "we're");
    s = s.replace(/\bthey are\b/gi, "they're");
    s = s.replace(/\bhe is\b/gi, "he's");
    s = s.replace(/\bshe is\b/gi, "she's");
    s = s.replace(/\bit is\b/gi, "it's");
    s = s.replace(/\bthat is\b/gi, "that's");
    s = s.replace(/\bwhat is\b/gi, "what's");
    s = s.replace(/\bwhere is\b/gi, "where's");
    s = s.replace(/\bcannot\b/gi, "can't");
    s = s.replace(/\bdo not\b/gi, "don't");
    s = s.replace(/\bdoes not\b/gi, "doesn't");
    s = s.replace(/\bdid not\b/gi, "didn't");
    s = s.replace(/\bwill not\b/gi, "won't");
    s = s.replace(/\bwould not\b/gi, "wouldn't");
    s = s.replace(/\bshould not\b/gi, "shouldn't");
    s = s.replace(/\bcould not\b/gi, "couldn't");
    s = s.replace(/\bhas not\b/gi, "hasn't");
    s = s.replace(/\bhave not\b/gi, "haven't");
    s = s.replace(/\bhad not\b/gi, "hadn't");
    s = s.replace(/\bis not\b/gi, "isn't");
    s = s.replace(/\bwas not\b/gi, "wasn't");
    s = s.replace(/\bwere not\b/gi, "weren't");
    s = s.replace(/\blet us\b/gi, "let's");
    
    return s;
  }

  async function speakGreeting(name: string) {
    const greetings = [
      `Good morning, ${name}.`,
      `Hey ${name}, good to see you.`,
      `Hi ${name}.`
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const prompt = "How are you feeling today?";
    await say(humanize(`${greeting} ${prompt}`), { rate: 1.2, pitch: 1.0 });
  }

  async function speakValidation(validationText: string) {
    // Warm, empathetic tone
    await say(humanize(validationText), { rate: 1.05, pitch: 1.05 });
  }
  
  async function speakPeerPrompt(promptText: string) {
    // Encouraging, slightly upbeat
    await say(humanize(promptText), { rate: 1.1, pitch: 1.08 });
  }

  async function speakResults(introText: string) {
    // Informative, neutral
    await say(humanize(introText), { rate: 1.08, pitch: 1.02 });
  }

  async function speakReview(reviewText: string) {
    // Reassuring, calm
    await say(humanize(reviewText), { rate: 1.0, pitch: 1.03 });
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
