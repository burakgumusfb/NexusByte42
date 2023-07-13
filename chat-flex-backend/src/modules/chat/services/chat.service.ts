import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatRoom } from '@schemas/chat-room.schema';
import { Message } from '@schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async getLatestChatMessages(userId: string): Promise<Message[]> {
    const messages = await this.messageModel.aggregate([
      {
        $lookup: {
          from: 'chatrooms',
          localField: 'chatRoomId',
          foreignField: '_id',
          as: 'chatRoom',
        },
      },
      {
        $unwind: '$chatRoom',
      },
      {
        $match: {
          'chatRoom.participants': new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: '_id',
          as: 'sender',
        },
      },
      {
        $unwind: '$sender',
      },
      {
        $project: {
          _id: 1,
          content: 1,
          timestamp: 1,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $limit: 50,
      },
    ]);
    return messages.reverse();
  }
}
