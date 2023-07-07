/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email, password);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const payload = { sub: user._id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async signUp(email: string, password: string): Promise<{ success: boolean }> {
    const user = await this.usersService.findOne(email, password);
    if (user) {
      return { success: false };
    }
    await this.usersService.insert(email, password);
    return { success: true };
  }
}
