import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';

describe('UserService', () => {
  let userService: UserService;
  const user = {
    email: 'test@example.com',
    password: 'password123',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('insert', () => {
    it('should return user when new user created', async () => {
      const result = await userService.insert(user.email, user.password);
      expect(result.email).toBe(user.email);
    });
  });
  describe('findone', () => {
    it('should return user when email and password are valid', async () => {
      const result = await userService.findOne(user.email, user.password);
      expect(result.email).toBe(user.email);
    });
  });
});
