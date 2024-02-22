import { Test, TestingModule } from '@nestjs/testing';
import { WSClientGateway } from './wsclient.gateway';

describe('WSClientGateway', () => {
  let gateway: WSClientGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WSClientGateway],
    }).compile();

    gateway = module.get<WSClientGateway>(WSClientGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
