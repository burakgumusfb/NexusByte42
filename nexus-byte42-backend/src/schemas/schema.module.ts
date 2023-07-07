import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { ChatRoomSchema } from './chat-room.schema';
import { MessageSchema } from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatRoomSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatRoomSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
})
export class SchemaModule {}
