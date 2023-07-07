import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';
import { UserService } from '@app/modules/user/services/user.service';

describe('AuthController', () => {
  let authController: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('signIn', () => {
    it('should return the access token when sign-in is successful', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = await authController.signIn(signInDto);
      expect(result.access_token).toBeDefined();
    });
  });

  describe('signUp', () => {
    it('should return HttpStatus.OK when sign-up is successful', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = await authController.signUp(signUpDto);
      expect(result).toBeDefined();
    });
  });
});
