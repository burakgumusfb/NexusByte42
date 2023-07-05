import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomModule } from '../chat/chat-room/chat-room.module';
import { MessageModule } from '../chat/message/message.module';
import { CustomConfigModule } from 'src/config/custom-config.module';
import { SocketGatewayService } from './services/socket.gateway.service';

@Module({
  imports: [CustomConfigModule, ChatRoomModule, MessageModule],
  providers: [SocketGateway, RedisProvider, SocketGatewayService],
})
export class SocketGatewayModule { }
