import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class MessageDto {
    @IsNotEmpty()
    chatRoomId: Types.ObjectId;
    @IsNotEmpty()
    senderId: Types.ObjectId;
    @IsNotEmpty()
    content: string;
}
