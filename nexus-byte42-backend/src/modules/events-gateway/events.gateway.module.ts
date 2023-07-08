import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomModule } from '../chat/chat-room/chat-room.module';
import { MessageModule } from '../chat/message/message.module';
import { CustomConfigModule } from 'src/config/custom-config.module';
import { EventsGatewayService } from './services/events.gateway.service';

@Module({
  imports: [CustomConfigModule, ChatRoomModule, MessageModule],
  providers: [EventsGateway, RedisProvider, EventsGatewayService],
})
export class EventGatewayModule { }
