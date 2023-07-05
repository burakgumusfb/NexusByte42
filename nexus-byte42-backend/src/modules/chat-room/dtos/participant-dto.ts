import { Types } from 'mongoose';

export class ParticipantDto {
  chatRoomId: Types.ObjectId;
  participantId: Types.ObjectId;
}
