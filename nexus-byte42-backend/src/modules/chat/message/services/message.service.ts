import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import { MessageDto } from '../dtos/message-dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  addMessage(messageDto: MessageDto) {
    const { chatRoomId, senderId, content } = messageDto;
    const messageModel = new this.messageModel({
      chatRoomId,
      senderId,
      content,
    });
    messageModel.save();
  }
}
