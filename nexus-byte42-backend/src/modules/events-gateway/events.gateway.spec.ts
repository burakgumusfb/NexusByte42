/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';
import { EventsGatewayService } from './services/events.gateway.service';
import { ChatRoomService } from '../chat/chat-room/services/chat-room.service';
import { MessageService } from '../chat/message/services/message.service';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';
import { RedisProvider } from '@app/providers/redis.provider';


describe('EventsGateway', () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      providers: [EventsGateway, EventsGatewayService, ChatRoomService, MessageService,RedisProvider],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

});
