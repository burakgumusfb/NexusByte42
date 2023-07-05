import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SocketModule } from './modules/socket/socket.module';
import { ChatModule } from './modules/chat/chat.module';
import { CustomConfigModule } from './config/custom-config.module';

@Module({
  imports: [
    CustomConfigModule,
    AuthModule,
    UserModule,
    ChatModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
