import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomModule } from '../chat-room/chat-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ChatRoomModule,
  ],
  providers: [SocketGateway, RedisProvider],
})
export class SocketModule {}
