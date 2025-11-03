// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// Charges are billed to your credits.
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

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
  try {
    const response = await openai.chat.completions.create({
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
  try {
    const response = await openai.chat.completions.create({
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
