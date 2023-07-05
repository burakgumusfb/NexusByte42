import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { SchemaModule } from 'src/schemas/schema.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/schemas/message.schema';

@Module({
  imports: [SchemaModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule { }
