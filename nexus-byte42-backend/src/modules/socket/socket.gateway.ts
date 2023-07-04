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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private readonly redis: RedisProvider,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: any, ...args: any[]) {
    const auth = client.handshake.headers.authorization;
    if (auth) {
      const token = auth.split(' ');
      if (token && token.length > 1) {
        const user = this.jwtService.verify(token[1]);
        if (!user) client.disconnect();
        this.server.emit('user_connected', {
          client_id: client.id,
          email: user.email,
        });
        this.redis.set(client.id, client.id);
        console.log('Bağlandı->' + client.id);
      }
    } else {
      client.disconnect();
    }
  }

  async handleDisconnect(client: any) {
    const clientid = await this.redis.get(client.id);
    console.log(clientid);
    this.server.emit('user_disconnected', {
      client_id: client.id,
    });
    console.log('Bağlandı->' + client.client_id);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
