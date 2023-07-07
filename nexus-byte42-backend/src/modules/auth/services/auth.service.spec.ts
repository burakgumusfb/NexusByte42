import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  const user = {
    email: 'test@example.com',
    password: 'password123',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      providers: [AuthService, UserService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('signIn', () => {
    it('should sign in user and return access token', async () => {
      const result = await authService.signIn(user.email, user.password);
      expect(result).not.toBeNull();
    });
  });

  describe('signUp', () => {
    it('should sign up user and return HttpStatus.OK', async () => {
      await userService.delete(user.email);
      const result = await authService.signUp(user.email, user.password);
      expect(result).toBe(HttpStatus.OK);
    });
  });
});
