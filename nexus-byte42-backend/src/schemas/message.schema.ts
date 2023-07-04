import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { ChatRoom } from './chat-room.schema';

@Schema()
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'ChatRoom', required: true })
  roomId: ChatRoom;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: User;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
