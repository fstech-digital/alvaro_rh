import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = userWhatsapp & Document;

@Schema()
export class userWhatsapp extends Document {
  @Prop({ required: true, unique: true })
  whatsappId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  whatsappNumber: string;

  @Prop({ default: 0 })
  stage: number;

  @Prop({ default: Date.now })
  firstInteractionDate: Date;

  @Prop({ default: Date.now })
  lastInteractionDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(userWhatsapp);
