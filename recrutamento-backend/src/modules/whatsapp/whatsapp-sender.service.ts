import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class WhatsAppSenderService {
  private twilioClient: Twilio.Twilio;
  private readonly fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
    this.twilioClient = Twilio(accountSid, authToken);
  }

  async sendMessage(to: string, message: string) {
    try {
      const response = await this.twilioClient.messages.create({
        body: message,
        from: this.fromNumber,
        to: `whatsapp:${to}`,
      });
      console.log('✅ Mensagem enviada com sucesso:', response.sid);
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error.message);
    }
  }
}
