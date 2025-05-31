import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userWhatsapp, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(userWhatsapp.name) private userModel: Model<UserDocument>) {}

  async findOrCreate(data: {
    ProfileName: string;
    WaId: string;
    AccountSid: string;
  }): Promise<userWhatsapp> {
    const now = new Date();

    const user = await this.userModel.findOneAndUpdate(
      { whatsappId: data.AccountSid },
      {
        $setOnInsert: {
          name: data.ProfileName,
          whatsappNumber: data.WaId,
          stage: 0,
          firstInteractionDate: now
        },
        $set: {
          lastInteractionDate: now
        }
      },
      {
        new: true,
        upsert: true
      }
    );

    return user;
  }
}
