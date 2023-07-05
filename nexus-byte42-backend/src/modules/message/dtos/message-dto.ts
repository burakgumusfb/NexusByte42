import { Types } from 'mongoose';
export class MessageDto {
    chatRoomId: Types.ObjectId;
    senderId: Types.ObjectId;
    content: string;
}
