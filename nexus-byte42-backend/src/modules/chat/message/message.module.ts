import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { SchemaModule } from 'src/schemas/schema.module';

@Module({
  imports: [SchemaModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule { }
