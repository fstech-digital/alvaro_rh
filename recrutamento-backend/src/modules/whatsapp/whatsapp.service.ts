import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
    private client: Client;
    private readonly logger = new Logger(WhatsappService.name);

    onModuleInit() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
        });

        this.client.on('qr', (qr) => {
            this.logger.log('QR Code gerado. Escaneie com o WhatsApp Web:');
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            this.logger.log('✅ Cliente WhatsApp pronto!');
        });

        this.client.on('message', async (msg) => {
            this.logger.log(`📩 ${msg.from}: ${msg.body}`);

            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                this.logger.log(`📎 Arquivo recebido: ${media.mimetype}, tamanho: ${media.data.length}`);
                // Aqui você pode integrar com o backend (ex: enviar para GridFS via API)
            }

            if (msg.body.toLowerCase() === 'oi') {
                await msg.reply('Olá! Seja bem-vindo ao processo seletivo!');
            }
        });

        this.client.initialize();
    }
}
