import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { ChatRoomSchema } from './chat-room.schema';
import { MessageSchema } from './message.schema';

const schemas = [
  { name: 'ChatRoom', schema: ChatRoomSchema },
  { name: 'User', schema: UserSchema },
  { name: 'Message', schema: MessageSchema },
];

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  exports: [MongooseModule.forFeature(schemas)],
})
export class SchemaModule {}
