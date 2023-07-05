import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomSchema } from 'src/schemas/chat-room.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { MessageSchema } from 'src/schemas/message.schema';

@Module({
  imports: [
    MessageModule,
    ChatRoomModule,
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatRoomSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ConfigModule.forRoot({ envFilePath: `.env` }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
