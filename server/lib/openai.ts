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
 * @param peerNames - Names of the peers to prompt
 * @returns Array of personalized peer prompts
 */
export async function generatePeerPrompts(
  studentCheckIn: string,
  peerNames: string[]
): Promise<PeerPrompt[]> {
  const client = getOpenAIClient();
  
  // Fallback if OpenAI not configured
  if (!client) {
    return peerNames.map(name => ({
      peerName: name,
      prompt: `${name}, Maya mentioned you're working together. How are you feeling about the project?`,
      emotion: "stressed"
    }));
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI facilitator helping students in a group check-in. Based on Maya's check-in, generate supportive prompts for her peers to share their perspectives. The prompts should:
- Validate emotions and show empathy
- Encourage authentic sharing
- Connect to what Maya shared
- Be warm, age-appropriate for K-12 students
- Keep responses brief and conversational

Return JSON with this format:
{
  "prompts": [
    {
      "peerName": "Marcus",
      "prompt": "Marcus, Maya mentioned you're working together. How are you feeling about the project?",
      "emotion": "stressed"
    }
  ]
}`
        },
        {
          role: "user",
          content: `Maya's check-in: "${studentCheckIn}"\n\nPeers to prompt: ${peerNames.join(", ")}\n\nGenerate supportive prompts for each peer.`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");
    return result.prompts || [];
  } catch (error) {
    console.error("Error generating peer prompts:", error);
    // Return default prompts if API fails
    return peerNames.map(name => ({
      peerName: name,
      prompt: `${name}, would you like to share how you're feeling today?`,
      emotion: "neutral"
    }));
  }
}

/**
 * Generate an emotional validation response for a student
 * @param studentCheckIn - The student's check-in message
 * @param studentName - The student's name
 * @returns A validating, empathetic response
 */
export async function generateEmotionalValidation(
  studentCheckIn: string,
  studentName: string
): Promise<string> {
  const client = getOpenAIClient();
  
  // Fallback if OpenAI not configured
  if (!client) {
    return `I hear you're feeling stressed, ${studentName}. That's completely valid when you're working on big projects.`;
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI facilitator validating a student's emotions during check-in. 
Your response should:
- Acknowledge their feelings with empathy
- Validate their emotions as completely normal
- Be brief (1-2 sentences)
- Use warm, age-appropriate language for K-12
- Show that you heard them

Do NOT give advice or solutions. Just validate and acknowledge.

Return JSON with this format:
{
  "validation": "I hear you're feeling stressed, Maya. That's completely valid when you're working on big projects."
}`
        },
        {
          role: "user",
          content: `Student: ${studentName}\nCheck-in: "${studentCheckIn}"\n\nGenerate an emotional validation response.`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 500,
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");
    return result.validation || `I hear you, ${studentName}. Thank you for sharing.`;
  } catch (error) {
    console.error("Error generating emotional validation:", error);
    return `I hear you, ${studentName}. Thank you for sharing.`;
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
