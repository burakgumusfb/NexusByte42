import { Module } from '@nestjs/common';
import { ChatRoomService } from './services/chat-room.service';
import { SchemaModule } from 'src/schemas/schema.module';

@Module({
  imports: [SchemaModule],
  providers: [ChatRoomService],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
