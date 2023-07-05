import { Module, ValidationPipe } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomModule } from '../chat-room/chat-room.module';
import { MessageModule } from '../message/message.module';
import { APP_PIPE } from '@nestjs/core';

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
export class SocketModule {}
