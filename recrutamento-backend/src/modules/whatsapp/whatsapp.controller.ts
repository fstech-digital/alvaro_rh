import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/user.service';

@Controller('whatsapp')
export class WhatsAppController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('webhook')
    async handleIncoming(@Body() body: any, @Res() res: Response) {
        console.log('📩 [Webhook Recebido]');

        // Mostra tudo recebido no body
        console.log(JSON.stringify(body, null, 2));

        // Logs úteis
        console.log('De:', body.From);
        console.log('Mensagem:', body.Body || '[sem texto]');

        // Se for mídia
        if (body.NumMedia && parseInt(body.NumMedia, 10) > 0) {
            console.log(`🖼 Mídia recebida:`);
            for (let i = 0; i < parseInt(body.NumMedia, 10); i++) {
                console.log(`- [${body[`MediaContentType${i}`]}] ${body[`MediaUrl${i}`]}`);
            }
        }

        // Chama o service para buscar ou criar o usuário
        await this.userService.findOrCreate({
            AccountSid: body.AccountSid,
            ProfileName: body.ProfileName,
            WaId: body.WaId,
        });
        

        res.status(200).send('<Response></Response>');
    }
}
