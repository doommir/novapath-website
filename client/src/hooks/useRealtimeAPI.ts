import { useEffect, useRef, useState, useCallback } from 'react';

interface RealtimeConfig {
  onAudioReceived?: (audioData: ArrayBuffer) => void;
  onTranscriptReceived?: (transcript: string) => void;
  onError?: (error: string) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

export function useRealtimeAPI(config: RealtimeConfig) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueue = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);

  // Connect to WebSocket server
  const connect = useCallback(() => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/realtime`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('Connected to Realtime API');
        setIsConnected(true);
        config.onConnected?.();
      };

      wsRef.current.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          
          switch (message.type) {
            case 'session.ready':
              console.log('Session ready:', message.sessionId);
              break;
              
            case 'response.audio.delta':
              // Received audio chunk from OpenAI
              if (message.delta) {
                const audioData = base64ToArrayBuffer(message.delta);
                audioQueue.current.push(audioData);
                if (!isPlayingRef.current) {
                  playAudioQueue();
                }
              }
              break;
              
            case 'conversation.item.input_audio_transcription.completed':
              // User's speech was transcribed
              if (message.transcript) {
                config.onTranscriptReceived?.(message.transcript);
              }
              break;
              
            case 'response.audio_transcript.delta':
              // AI's response being transcribed
              if (message.delta) {
                config.onTranscriptReceived?.(message.delta);
              }
              break;
              
            case 'error':
              console.error('Realtime API error:', message.error);
              config.onError?.(message.error);
              break;
              
            case 'session.closed':
              console.log('Session closed');
              disconnect();
              break;
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        config.onError?.('Connection error');
      };

      wsRef.current.onclose = () => {
        console.log('Disconnected from Realtime API');
        setIsConnected(false);
        config.onDisconnected?.();
      };
    } catch (error) {
      console.error('Failed to connect:', error);
      config.onError?.('Failed to connect to Realtime API');
    }
  }, [config]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsListening(false);
  }, []);

  // Start listening to microphone
  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 24000, // OpenAI expects 24kHz
          echoCancellation: true,
          noiseSuppression: true
        } 
      });

      // Create audio context for processing
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      }

      // Create MediaRecorder for capturing audio
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });

      mediaRecorderRef.current = mediaRecorder;

      // Handle audio data
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
          // Convert to PCM16 and send to server
          const arrayBuffer = await event.data.arrayBuffer();
          const pcm16 = await convertToPCM16(arrayBuffer);
          const base64Audio = arrayBufferToBase64(pcm16);
          
          // Send audio chunk to OpenAI via WebSocket
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: base64Audio
          }));
        }
      };

      // Start recording in small chunks for low latency
      mediaRecorder.start(100); // 100ms chunks
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start listening:', error);
      config.onError?.('Microphone access denied');
    }
  }, [config]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current = null;
    }
    
    // Commit the audio buffer to trigger response
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'input_audio_buffer.commit'
      }));
      
      // Request a response from the AI
      wsRef.current.send(JSON.stringify({
        type: 'response.create'
      }));
    }
    
    setIsListening(false);
  }, []);

  // Play audio queue
  const playAudioQueue = async () => {
    if (isPlayingRef.current || audioQueue.current.length === 0) {
      return;
    }

    isPlayingRef.current = true;

    while (audioQueue.current.length > 0) {
      const audioData = audioQueue.current.shift();
      if (audioData) {
        await playAudioChunk(audioData);
      }
    }

    isPlayingRef.current = false;
  };

  // Play a single audio chunk
  const playAudioChunk = async (audioData: ArrayBuffer): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      }

      audioContextRef.current.decodeAudioData(
        audioData,
        (buffer) => {
          const source = audioContextRef.current!.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContextRef.current!.destination);
          source.onended = () => resolve();
          source.start();
          config.onAudioReceived?.(audioData);
        },
        (error) => {
          console.error('Error decoding audio:', error);
          resolve();
        }
      );
    });
  };

  // Convert WebM Opus to PCM16 (simplified - in production use proper conversion)
  const convertToPCM16 = async (arrayBuffer: ArrayBuffer): Promise<ArrayBuffer> => {
    // Note: This is a simplified version. In production, you'd need to properly
    // decode the WebM/Opus and convert to PCM16 format expected by OpenAI.
    // For now, we'll just pass through the audio data
    // TODO: Implement proper audio format conversion
    return arrayBuffer;
  };

  // Utility: Convert base64 to ArrayBuffer
  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Utility: Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [disconnect]);

  return {
    isConnected,
    isListening,
    connect,
    disconnect,
    startListening,
    stopListening
  };
}
