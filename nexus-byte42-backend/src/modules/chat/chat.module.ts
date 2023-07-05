import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { SchemaModule } from 'src/schemas/schema.module';
import { CustomConfigModule } from 'src/config/custom-config.module';

@Module({
  imports: [CustomConfigModule, SchemaModule, MessageModule, ChatRoomModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatRoomModule, MessageModule, ChatService],
})
export class ChatModule {}
