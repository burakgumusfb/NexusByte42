import { Module } from '@nestjs/common';
import { ChatRoomService } from './services/chat-room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomSchema } from 'src/schemas/chat-room.schema';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatRoomSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [ChatRoomService],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
