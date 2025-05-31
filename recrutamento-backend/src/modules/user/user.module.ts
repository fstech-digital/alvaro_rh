import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userWhatsapp, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: userWhatsapp.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
