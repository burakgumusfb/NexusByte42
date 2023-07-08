/* eslint-disable prettier/prettier */
import { CustomConfigModule } from '@app/config/custom-config.module';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { MessageService } from '../message/services/message.service';
import { ChatRoomService } from '../chat-room/services/chat-room.service';
import { UserService } from '@app/modules/user/services/user.service';
import { SchemaModule } from '@app/schemas/schema.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { MessageDto } from '../message/dtos/message-dto';
import { ParticipantDto } from '../chat-room/dtos/participant.dto';

describe('ChatService', () => {
    let chatService: ChatService;
    let userService: UserService;
    let messageService: MessageService;
    let chatRoomService: ChatRoomService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CustomConfigModule, SchemaModule],
            providers: [AuthService, UserService, MessageService, ChatRoomService, ChatService],
        }).compile();

        userService = module.get<UserService>(UserService);
        messageService = module.get<MessageService>(MessageService);
        chatRoomService = module.get<ChatRoomService>(ChatRoomService);
        chatService = module.get<ChatService>(ChatService);
    });

    describe('getLatestChatMessages', () => {
        it('should return latest chat messages for a user', async () => {
            const chatRoom = await chatRoomService.createChatRoomIfNotExist();
            const user = await userService.createUserIfNotExist('test06@example.com', '12345');
            const participantDto: ParticipantDto = {
                chatRoomId: chatRoom._id,
                participantId: user._id,
            };
            await chatRoomService.addParticipant(participantDto);
            const content = 'Hello, world!!';
            const messageDto: MessageDto = {
                chatRoomId: chatRoom._id,
                senderId: user._id,
                content,
            };
            await messageService.addMessage(messageDto);
            const messages = await chatService.getLatestChatMessages(user._id);
            expect(messages.length).toBeGreaterThan(0);
        });
    });
});
