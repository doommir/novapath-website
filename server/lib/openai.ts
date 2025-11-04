// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// Charges are billed to your credits.
import OpenAI from "openai";

// Lazy initialization - only create client if credentials are available
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (openai) return openai;
  
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  
  if (!baseURL || !apiKey) {
    console.warn("OpenAI integration not configured. Using fallback responses.");
    return null;
  }
  
  openai = new OpenAI({ baseURL, apiKey });
  return openai;
}

export interface PeerPrompt {
  peerName: string;
  prompt: string;
  emotion: string;
}

/**
 * Generate intelligent peer prompts based on a student's check-in
 * @param studentCheckIn - The student's check-in message
 * @param studentName - The student's name
 * @param peerNames - Names of the peers to prompt
 * @returns Array of personalized peer prompts
 */
export async function generatePeerPrompts(
  studentCheckIn: string,
  studentName: string,
  peerNames: string[]
): Promise<PeerPrompt[]> {
  const client = getOpenAIClient();
  
  // Fallback if OpenAI not configured
  if (!client) {
    return peerNames.map(name => ({
      peerName: name,
      prompt: `${name}, ${studentName} mentioned you're working together. How are you feeling about the project?`,
      emotion: "stressed"
    }));
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI facilitator in a student group check-in. Generate a supportive prompt for each peer listed.

Guidelines:
- Be warm and empathetic, like a caring teacher
- Keep each prompt brief (1-2 sentences)
- Connect to what the student shared if relevant
- Encourage authentic sharing
- Age-appropriate for K-12 students

CRITICAL: You MUST return exactly one prompt object for each peer name provided.

Return JSON with this exact structure:
{
  "prompts": [
    {"peerName": "Marcus", "prompt": "Marcus, the student mentioned you're working together on the science fair. How are you feeling about it?"}
  ]
}`
        },
        {
          role: "user",
          content: `${studentName} said: "${studentCheckIn}"

Generate a supportive prompt for: ${peerNames.join(", ")}

Remember: Return one prompt for each name listed above.`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }
    
    const result = JSON.parse(content);
    
    // Validate we got prompts
    if (!result.prompts || !Array.isArray(result.prompts) || result.prompts.length === 0) {
      console.error("OpenAI returned empty prompts array. Response:", content);
      throw new Error("Empty prompts array");
    }
    
    return result.prompts;
  } catch (error) {
    console.error("Error generating peer prompts:", error);
    // Return default prompts if API fails
    return peerNames.map(name => ({
      peerName: name,
      prompt: `${name}, ${studentName} mentioned feeling stressed. How are you feeling about working together?`,
      emotion: "neutral"
    }));
  }
}

export interface ValidationResult {
  validation: string;
  sentiment: "positive" | "negative" | "neutral";
}

/**
 * Generate an emotional validation response with sentiment analysis for a student
 * @param studentCheckIn - The student's check-in message
 * @param studentName - The student's name
 * @returns A validating, empathetic response with detected sentiment
 */
export async function generateEmotionalValidation(
  studentCheckIn: string,
  studentName: string
): Promise<ValidationResult> {
  const client = getOpenAIClient();
  
  // Fallback if OpenAI not configured
  if (!client) {
    return {
      validation: `I hear you're feeling stressed, ${studentName}. That's completely valid when you're working on big projects.`,
      sentiment: "negative"
    };
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI facilitator validating a student's emotions during check-in. 

Analyze the sentiment of their check-in and provide an appropriate validation:
- POSITIVE: excited, happy, energetic, proud, grateful
- NEGATIVE: stressed, worried, sad, angry, anxious, frustrated
- NEUTRAL: calm, okay, fine, neither positive nor negative

Your validation should match the sentiment:
- For NEGATIVE: Be warm, empathetic, normalize their feelings
- For POSITIVE: Be celebratory, enthusiastic, share their joy
- For NEUTRAL: Be supportive, engaged

Response format:
- Acknowledge their feelings with empathy
- Validate their emotions as completely normal
- Be brief (1-2 sentences)
- Use warm, age-appropriate language for K-12
- Show that you heard them

Do NOT give advice or solutions. Just validate and acknowledge.

Return JSON with this exact format:
{
  "validation": "I hear you're feeling stressed, Alex. That's completely valid when you're working on big projects.",
  "sentiment": "negative"
}`
        },
        {
          role: "user",
          content: `Student: ${studentName}\nCheck-in: "${studentCheckIn}"\n\nAnalyze the sentiment and generate an emotional validation response.`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 500,
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");
    return {
      validation: result.validation || `I hear you, ${studentName}. Thank you for sharing.`,
      sentiment: result.sentiment || "neutral"
    };
  } catch (error) {
    console.error("Error generating emotional validation:", error);
    return {
      validation: `I hear you, ${studentName}. Thank you for sharing.`,
      sentiment: "neutral"
    };
  }
}

/**
 * Generate a natural results introduction
 * @param studentCheckIn - The student's check-in message
 * @returns A conversational intro to the results
 */
export async function generateResultsIntro(
  studentCheckIn: string
): Promise<string> {
  const client = getOpenAIClient();
  
  // Fallback if OpenAI not configured
  if (!client) {
    return "I've created a few things that might be helpful for you.";
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI assistant introducing automated workflows.
Your response should:
- Be brief (1 sentence)
- Reference what you noticed in the student's check-in
- Sound natural and conversational
- Be warm and supportive

Return JSON with this format:
{
  "intro": "Based on what you shared about feeling stressed with the science fair, I've logged your attendance and created a couple of notes for your teacher."
}`
        },
        {
          role: "user",
          content: `Student check-in: "${studentCheckIn}"\n\nGenerate a brief intro to the results.`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const result = JSON.parse(content);
    return result.intro || "I've created a few things that might be helpful.";
  } catch (error) {
    console.error("Error generating results intro:", error);
    return "I've created a few things that might be helpful.";
  }
}

/**
 * Generate a natural review screen message
 * @param studentName - The student's name
 * @returns A reassuring message about teacher review
 */
export async function generateReviewMessage(
  studentName: string
): Promise<string> {
  const client = getOpenAIClient();
  
  // Fallback if OpenAI not configured
  if (!client) {
    return "Your teacher will review this before anything happens. You're supported.";
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI assistant explaining teacher oversight.
Your response should:
- Be brief (1-2 sentences)
- Emphasize that a human teacher reviews everything before action
- Be reassuring and supportive
- Sound natural and conversational

Return JSON with this format:
{
  "message": "Ms. Rodriguez will review everything before any action is taken. You're not alone in this."
}`
        },
        {
          role: "user",
          content: `Student: ${studentName}\n\nGenerate a reassuring message about teacher review.`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");
    return result.message || "Your teacher will review this before anything happens.";
  } catch (error) {
    console.error("Error generating review message:", error);
    return "Your teacher will review this before anything happens.";
  }
}

/**
 * Generate natural speech audio using OpenAI TTS
 * @param text - The text to convert to speech
 * @param voice - The voice to use (alloy, echo, fable, onyx, nova, shimmer)
 * @returns Audio buffer as base64 string
 */
export async function generateSpeech(
  text: string,
  voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer" = "nova"
): Promise<string | null> {
  const client = getOpenAIClient();
  
  if (!client) {
    console.warn("OpenAI TTS not available. Returning null.");
    return null;
  }
  
  try {
    const response = await client.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
      speed: 1.0,
    });

    // Convert response to buffer then to base64
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer.toString('base64');
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
}
