import { Test, TestingModule } from '@nestjs/testing';
import { TestClientGateway } from './test-client.gateway';

describe('TestClientGateway', () => {
  let gateway: TestClientGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestClientGateway],
    }).compile();

    gateway = module.get<TestClientGateway>(TestClientGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
