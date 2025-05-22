import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import mongoose, { Types, Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { GridFsService } from 'src/services/gridfs.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly gridFsService: GridFsService,
        @InjectConnection() private readonly connection: Connection,
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadResume(
        @UploadedFile() file: Express.Multer.File,
        @Body('phone') phone: string,
    ) {
        const fileId = await this.gridFsService.uploadPdf(file);
        return this.userService.saveResumeGridFS(phone, fileId);
    }

    @Get('resume/:id')
    async getResume(@Param('id') id: string, @Res() res: Response) {
        const db = this.connection.db;
        if (!db) {
            throw new Error('Database connection not initialized');
        }

        const bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'uploads',
        });

        const fileStream = bucket.openDownloadStream(new Types.ObjectId(id));
        fileStream.pipe(res);
    }

}

