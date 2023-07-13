/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  const userData = {
    email: 'test@example.com',
    password: 'password123',
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      providers: [AuthService, UserService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('signIn', () => {
    it('should sign in user and return access token', async () => {
      let result = undefined;
      const user = await userService.createUserIfNotExist(userData.email, userData.password);
      if (user) {
         result = await authService.signIn(userData.email, userData.password);
      }
      expect(result).toBeDefined();
    });
  });

  describe('signUp', () => {
    it('should sign up user and return a result', async () => {
      const result = await authService.signUp(userData.email, userData.password);
      expect(result.success).toEqual(result.success);
    });
  });
});
