import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomModule } from '../chat/chat-room/chat-room.module';
import { MessageModule } from '../chat/message/message.module';
import { CustomConfigModule } from 'src/config/custom-config.module';
import { EventGatewayService } from './services/event.gateway.service';

@Module({
  imports: [CustomConfigModule, ChatRoomModule, MessageModule],
  providers: [EventGateway, RedisProvider, EventGatewayService],
})
export class EventGatewayModule { }
