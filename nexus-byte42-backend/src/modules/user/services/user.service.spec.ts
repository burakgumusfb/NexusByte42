import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { SchemaModule } from '@app/schemas/schema.module';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomConfigModule, SchemaModule],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('insert', () => {
    it('should return user when new user created', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const result = await userService.insert(email, password);
      expect(result.email).toBe(email);
    });
  });

  describe('findOne', () => {
    it('should return user when email and password are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const result = await userService.findOne(email, password);
      expect(result.email).toBe(email);
    });
  });
});
