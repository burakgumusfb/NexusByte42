import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisProvider } from 'src/providers/redis.provider';
import { ChatRoomService } from '../chat-room/services/chat-room.service';
import { MessageDto } from '../message/dtos/message-dto';
import { MessageService } from '../message/services/message.service';
import { Types } from 'mongoose';
import { ParticipantDto } from '../chat-room/dtos/participant-dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisProvider,
  ) { }

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
    this.redis.set(client.id, user.sub);
    console.log('handleConnection-->' + client.id);

    const chatRoom = await this.chatRoomService.createChatRoomIfNotExist();
    if (chatRoom) {
      const participantDto: ParticipantDto = {
        chatRoomId: chatRoom._id,
        participantId: user.sub,
      };
      await this.chatRoomService.addParticipant(participantDto);
    }
  }

  handleDisconnect(client: any) {
    console.log('handleDisconnect->' + client.id);
    this.server.emit('user_disconnected', {
      client_id: client.id,
    });
  }

  @SubscribeMessage('message')
  async listenForMessages(
    @MessageBody() data: any,
    @ConnectedSocket() client: any,
  ) {
    console.log(data);
    console.log('listenForMessages->' + client.id);

    const chatRoom = await this.chatRoomService.createChatRoomIfNotExist();
    const userId = await this.redis.get(client.id);

    const messageDto: MessageDto = {
      content: data,
      chatRoomId: chatRoom._id,
      senderId: new Types.ObjectId(userId),
    };

    await this.messageService.addMessage(messageDto);
    this.server.sockets.emit('receive_message', messageDto.content);
  }
}
