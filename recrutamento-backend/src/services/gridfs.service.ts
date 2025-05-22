import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose, { Connection } from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class GridFsService implements OnModuleInit {
    private bucket: GridFSBucket;

    constructor(@InjectConnection() private readonly connection: Connection) { }

    onModuleInit() {
        const db = this.connection.db;
        if (!db) {
            throw new Error('MongoDB connection not initialized');
        }

        this.bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'uploads',
        });
    }

    async uploadPdf(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const readStream = require('fs').createReadStream(file.path);
            const uploadStream = this.bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype,
            });

            readStream.pipe(uploadStream)
                .on('error', reject)
                .on('finish', () => {
                    resolve(uploadStream.id.toString());
                });
        });
    }
}
