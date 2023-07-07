/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MessageService } from './message.service';
import { Message } from '@schemas/message.schema';
import { MessageDto } from '../dtos/message-dto';
import { getModelToken } from '@nestjs/mongoose';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { UserService } from '@app/modules/user/services/user.service';
import { ChatRoom } from '@app/schemas/chat-room.schema';
import { User } from '@app/schemas/user.schema';
import { ChatRoomService } from '../../chat-room/services/chat-room.service';

describe('MessageService', () => {
  let messageService: MessageService;
  let chatRoomService: ChatRoomService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      providers: [AuthService, UserService, MessageService, ChatRoomService],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
    chatRoomService = module.get<ChatRoomService>(ChatRoomService);
    userService = module.get<UserService>(UserService);
  });

  describe('addMessage', () => {
    it('should add a new message to the chat room', async () => {
      const chatRoom = await chatRoomService.createChatRoomIfNotExist();
      const user = await userService.createUserIfNotExist('test0001@gmail.com', '12345')
      const content = 'Hello, world!';
      const messageDto: MessageDto = {
        chatRoomId: chatRoom._id,
        senderId: user._id,
        content,
      };
      const result = await messageService.addMessage(messageDto);
      expect(result).toBeDefined();
    });
  });
});
