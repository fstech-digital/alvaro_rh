import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    phone: string;

    @Prop()
    name?: string;

    @Prop({ type: Types.ObjectId })
    resumePath?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
