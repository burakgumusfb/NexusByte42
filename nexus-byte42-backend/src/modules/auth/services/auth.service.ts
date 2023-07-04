import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email, password);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email, password);
    if (user) {
      throw new InternalServerErrorException('This email already exist');
    }
    await this.usersService.insert(email, password);
  }
}
