import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private readonly jwtService: JwtService,
    ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('get-chat')
  GetChat(@Req() request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const user = this.jwtService.verify(token);
    return this.chatService.getLatestChatMessages(user.sub);
  }
}
