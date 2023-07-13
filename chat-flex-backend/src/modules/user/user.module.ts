import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { SchemaModule } from 'src/schemas/schema.module';

@Module({
  imports: [SchemaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
