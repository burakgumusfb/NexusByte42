/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { ONLINE_USERS } from 'src/common/constants/chat.constant';
import { RedisProvider } from 'src/providers/redis.provider';
import { OnlineUsersDto } from '../dtos/online-users.dto';

@Injectable()
export class SocketGatewayService {
  constructor(private readonly redis: RedisProvider) { }

  async addOnlineUser(newOnlineUser: OnlineUsersDto): Promise<OnlineUsersDto[]> {
    let storedOnlineUsers = await this.getStoredOnlineUsers();

    const existingUserIndex = storedOnlineUsers.findIndex(
      (user) => user.email === newOnlineUser.email,
    );

    if (existingUserIndex !== -1) {
      storedOnlineUsers.splice(existingUserIndex, 1);
    }

    storedOnlineUsers.push(newOnlineUser);
    await this.redis.set(ONLINE_USERS, JSON.stringify(storedOnlineUsers));
    await this.redis.set(newOnlineUser.connectionId, newOnlineUser.userId);
    return storedOnlineUsers;
  }

  async removeOnlineUser(connectionId: string): Promise<OnlineUsersDto[]> {
    let storedOnlineUsers = await this.getStoredOnlineUsers();

    const existingUserIndex = storedOnlineUsers.findIndex(
      (user) => user.connectionId === connectionId,
    );

    if (existingUserIndex !== -1) {
      storedOnlineUsers.splice(existingUserIndex, 1);
      await this.redis.set(ONLINE_USERS, JSON.stringify(storedOnlineUsers));
    }

    return storedOnlineUsers;
  }

  async getOnlineUserId(connectionId: string): Promise<string> {
    return (await this.redis.get(connectionId)).toString();
  }

  private async getStoredOnlineUsers(): Promise<OnlineUsersDto[]> {
    const storedOnlineUsersData = await this.redis.get(ONLINE_USERS);
    return storedOnlineUsersData ? JSON.parse(storedOnlineUsersData) : [];
  }
}
