import { Test, TestingModule } from '@nestjs/testing';
import { YoummdayService } from './yoummday.service';

describe('YoummdayService', () => {
  let service: YoummdayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoummdayService],
    }).compile();

    service = module.get<YoummdayService>(YoummdayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
