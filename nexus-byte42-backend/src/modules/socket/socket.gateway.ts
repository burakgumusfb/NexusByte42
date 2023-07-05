import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomService } from '../chat-room/services/chat-room.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private jwtService: JwtService,
    private readonly redis: RedisProvider,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: any, ...args: any[]) {
    const auth = client.handshake.headers.authorization;
    if (!auth) {
      client.disconnect();
      return;
    }

    const token = auth.split(' ');
    if (!token || token.length <= 1) {
      client.disconnect();
      return;
    }

    const user = this.jwtService.verify(token[1]);
    if (!user) {
      client.disconnect();
      return;
    }

    this.server.emit('user_connected', {
      client_id: client.id,
      email: user.email,
    });
    this.redis.set(client.id, client.id);

    const chatRoom = await this.chatRoomService.createChatRoomIfNotExist();
    if (chatRoom) {
      await this.chatRoomService.addParticipant(chatRoom._id, user.sub);
    }
  }

  async handleDisconnect(client: any) {
    const clientid = await this.redis.get(client.id);
    console.log(clientid);
    this.server.emit('user_disconnected', {
      client_id: client.id,
    });
  }
  // @UseGuards(AuthGuard)
  @SubscribeMessage('message')
  listenForMessages(@MessageBody() data: string) {
    this.server.sockets.emit('receive_message', data);
  }
}
