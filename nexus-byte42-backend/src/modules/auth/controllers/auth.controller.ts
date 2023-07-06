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
import { SignInDto } from '../dtos/sign-in.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { RedisProvider } from 'src/providers/redis.provider';
import { SignUpDto } from '../dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly redis: RedisProvider,
    private authService: AuthService,
  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }
}
