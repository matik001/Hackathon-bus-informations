import { Test, TestingModule } from '@nestjs/testing';
import { MpkService } from './mpk.service';

describe('MpkService', () => {
  let service: MpkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpkService],
    }).compile();

    service = module.get<MpkService>(MpkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
