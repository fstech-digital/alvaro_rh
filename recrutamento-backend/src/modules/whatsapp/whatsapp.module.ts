import { Module } from '@nestjs/common';
import { WhatsAppController } from './whatsapp.controller';
import { UserModule } from '../user/user.module';
import { WhatsAppSenderService } from './whatsapp-sender.service';

@Module({
  imports: [UserModule],
  controllers: [WhatsAppController],
  providers: [WhatsAppSenderService],
})
export class WhatsappModule { }
