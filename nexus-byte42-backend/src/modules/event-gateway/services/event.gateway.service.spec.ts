import { Test, TestingModule } from '@nestjs/testing';
import { EventGatewayService } from './event.gateway.service';

describe('EventGatewayService', () => {
  let service: EventGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventGatewayService],
    }).compile();

    service = module.get<EventGatewayService>(EventGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
