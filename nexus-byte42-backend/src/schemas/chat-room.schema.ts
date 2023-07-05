import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class ChatRoom extends Document {

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  participants: User[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
