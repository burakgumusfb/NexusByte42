import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventGatewayModule } from './modules/event-gateway/event.gateway.module';
import { ChatModule } from './modules/chat/chat.module';
import { CustomConfigModule } from './config/custom-config.module';

@Module({
  imports: [
    CustomConfigModule,
    AuthModule,
    UserModule,
    ChatModule,
    EventGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
