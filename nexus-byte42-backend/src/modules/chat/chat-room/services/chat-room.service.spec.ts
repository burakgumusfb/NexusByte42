/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomService } from './chat-room.service';
import { Model } from 'mongoose';
import { ChatRoom } from '@schemas/chat-room.schema';
import { User } from '@schemas/user.schema';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { UserService } from '@app/modules/user/services/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { ParticipantDto } from '../dtos/participant.dto';

describe('ChatRoomService', () => {
    let chatRoomService: ChatRoomService;
    let userModel: Model<User>;
    let chatRoomModel: Model<ChatRoom>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CustomConfigModule, SchemaModule],
            providers: [AuthService, UserService, ChatRoomService],
        }).compile();

        chatRoomService = module.get<ChatRoomService>(ChatRoomService);
        userModel = module.get<Model<User>>(getModelToken(User.name));
        chatRoomModel = module.get<Model<ChatRoom>>(getModelToken(ChatRoom.name));
    });

    describe('createChatRoomIfNotExist', () => {
        it('should create a new chat room if it does not exist', async () => {
            const result = await chatRoomService.createChatRoomIfNotExist();
            expect(result).toBeDefined();
        });
    });

    describe('addParticipant', () => {
        it('should add participant to the chat room if the user exists and is not already a participant', async () => {
            const chatRoom = await chatRoomService.createChatRoomIfNotExist();
            const user = await userModel.findOne();
            const participantDto: ParticipantDto = {
                chatRoomId: chatRoom._id,
                participantId: user._id,
            };
            await chatRoomService.addParticipant(participantDto);
            const updatedChatRoom = await chatRoomModel.findById(chatRoom._id);
            const addedParticipant = updatedChatRoom.participants.find((p) =>
                p.equals(user._id),
            );
            expect(addedParticipant).toBeDefined();
        });
    });
});
