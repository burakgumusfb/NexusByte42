import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ChatRoom } from 'src/schemas/chat-room.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoom>,
  ) {}

  async createChatRoomIfNotExist(): Promise<ChatRoom> {
    let chatRoom = await this.chatRoomModel.findOne().lean().exec();
    if (!chatRoom) {
      chatRoom = new this.chatRoomModel();
      await chatRoom.save();
    }
    return chatRoom;
  }
  async addParticipant(chatRoomId: ObjectId, participantId: ObjectId) {
    const chatRoom = await this.chatRoomModel.findById(chatRoomId);

    const user = await this.userModel.findById(participantId);
    if (!user) {
      throw new Error('User does not exist.');
    }

    const participantExists = chatRoom.participants.some((p: User) =>
      p._id.equals(participantId),
    );
    if (!participantExists) {
      chatRoom.participants.push(user._id);
    }

    return chatRoom.save();
  }
}
