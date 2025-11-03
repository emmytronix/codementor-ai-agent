// src/integrations/telexIntegration.ts
import axios from 'axios';

const TELEX_API_URL = process.env.TELEX_API_URL || 'https://api.telex.im';

export interface TelexMessage {
  channelId: string;
  message: string;
}

export async function sendToTelex(payload: TelexMessage): Promise<void> {
  try {
    console.log('📤 Sending to Telex:', payload.channelId);
    
    await axios.post(
      `${TELEX_API_URL}/messages`,
      {
        channel_id: payload.channelId,
        content: payload.message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );
    
    console.log('✅ Message sent successfully to Telex');
  } catch (error: any) {
    console.error('❌ Failed to send to Telex:', error.message);
    if (error.response) {
      console.error('Response error:', error.response.data);
    }
    throw error;
  }
}