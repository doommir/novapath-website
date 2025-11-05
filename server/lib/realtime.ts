import WebSocket, { WebSocketServer } from 'ws';

interface RealtimeSession {
  clientWs: WebSocket;
  openaiWs: WebSocket | null;
  sessionConfig: {
    model: string;
    voice: string;
    instructions: string;
    temperature: number;
    max_response_output_tokens: number;
  };
}

// Store active sessions
const sessions = new Map<string, RealtimeSession>();

export function setupRealtimeWebSocket(server: any) {
  const wss = new WebSocketServer({ 
    server,
    path: '/ws/realtime'
  });

  wss.on('connection', async (clientWs: WebSocket) => {
    console.log('Client connected to Realtime API WebSocket');
    
    const sessionId = generateSessionId();
    let openaiWs: WebSocket | null = null;

    const session: RealtimeSession = {
      clientWs,
      openaiWs: null,
      sessionConfig: {
        model: 'gpt-4o-realtime-preview-2024-10-01',
        voice: 'alloy', // Can be: alloy, echo, shimmer, or newer voices
        instructions: `You are a compassionate AI facilitator in a school check-in session. Your role is to:
1. Listen empathetically to students sharing their feelings and concerns
2. Validate their emotions with warmth and understanding
3. Ask thoughtful follow-up questions to help them process their feelings
4. Help facilitate peer support by suggesting ways classmates can help each other
5. Speak in a natural, conversational tone - like a caring teacher or counselor
6. Be concise but genuine - avoid overly long responses
7. Match your tone to the student's emotional state (slower and warmer for stress, upbeat for excitement)

Remember: You're not solving problems, you're helping students feel heard and supported.`,
        temperature: 0.8,
        max_response_output_tokens: 4096
      }
    };

    sessions.set(sessionId, session);

    try {
      // Get OpenAI API key from Replit AI integration
      // Try Replit integration first, fallback to direct OPENAI_API_KEY
      const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
      
      if (!apiKey) {
        console.error('OpenAI API key not found');
        clientWs.send(JSON.stringify({ 
          type: 'error', 
          error: 'OpenAI API key not configured' 
        }));
        return;
      }

      // Connect to OpenAI Realtime API
      const url = 'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01';
      openaiWs = new WebSocket(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Beta': 'realtime=v1'
        }
      });

      session.openaiWs = openaiWs;

      // OpenAI WebSocket opened
      openaiWs.on('open', () => {
        console.log('Connected to OpenAI Realtime API');
        
        // Send session configuration
        openaiWs!.send(JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: session.sessionConfig.instructions,
            voice: session.sessionConfig.voice,
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: {
              model: 'whisper-1'
            },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500
            },
            temperature: session.sessionConfig.temperature,
            max_response_output_tokens: session.sessionConfig.max_response_output_tokens
          }
        }));

        // Notify client that connection is ready
        clientWs.send(JSON.stringify({ 
          type: 'session.ready',
          sessionId 
        }));
      });

      // Forward messages from OpenAI to client
      openaiWs.on('message', (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          
          // Log important events for debugging
          if (message.type === 'error') {
            console.error('OpenAI error:', message.error);
          } else if (message.type === 'response.audio.delta') {
            // Audio chunk - forward to client
          } else if (message.type === 'conversation.item.created') {
            console.log('OpenAI created item:', message.item?.type);
          }

          // Forward all messages to client
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(data);
          }
        } catch (error) {
          console.error('Error processing OpenAI message:', error);
        }
      });

      // Handle OpenAI errors
      openaiWs.on('error', (error) => {
        console.error('OpenAI WebSocket error:', error);
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({ 
            type: 'error', 
            error: 'OpenAI connection error' 
          }));
        }
      });

      // Handle OpenAI disconnect
      openaiWs.on('close', () => {
        console.log('OpenAI WebSocket closed');
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({ 
            type: 'session.closed' 
          }));
        }
        sessions.delete(sessionId);
      });

      // Forward messages from client to OpenAI
      clientWs.on('message', (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          
          // Log client events for debugging
          if (message.type === 'input_audio_buffer.append') {
            // Audio data from client
          } else if (message.type === 'input_audio_buffer.commit') {
            console.log('Client committed audio buffer');
          } else if (message.type === 'response.create') {
            console.log('Client requested response');
          }

          // Forward to OpenAI if connected
          if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
            openaiWs.send(data);
          }
        } catch (error) {
          console.error('Error processing client message:', error);
        }
      });

      // Handle client disconnect
      clientWs.on('close', () => {
        console.log('Client disconnected from Realtime API');
        if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
          openaiWs.close();
        }
        sessions.delete(sessionId);
      });

      // Handle client errors
      clientWs.on('error', (error) => {
        console.error('Client WebSocket error:', error);
      });

    } catch (error) {
      console.error('Error setting up Realtime API connection:', error);
      clientWs.send(JSON.stringify({ 
        type: 'error', 
        error: 'Failed to connect to OpenAI Realtime API' 
      }));
    }
  });

  console.log('Realtime WebSocket server initialized at /ws/realtime');
  return wss;
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}
