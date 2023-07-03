import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/sign-in-dto';
import { AuthGuard } from '../../../common/guard/auth.guard';
import { Public } from 'src/common/decorator/public.decorator';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private authService: AuthService,
  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    this.redis.set(signInDto.email, signInDto.password);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('get-chat')
  GetChat() {
    return this.redis.get('burak');
  }
}
