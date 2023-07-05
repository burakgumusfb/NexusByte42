import { Module, ValidationPipe } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisProvider } from 'src/providers/redis.provider';
import { APP_PIPE } from '@nestjs/core';
import { ChatModule } from '../chat/chat.module';
import { ChatRoom } from 'src/schemas/chat-room.schema';
import { ChatRoomModule } from '../chat/chat-room/chat-room.module';
import { MessageModule } from '../chat/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ChatRoomModule,
    MessageModule,
  ],
  providers: [SocketGateway, RedisProvider],
})
export class SocketModule { }
