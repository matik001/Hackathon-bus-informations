import { Test, TestingModule } from '@nestjs/testing';
import { MpkController } from './mpk.controller';
import { MpkService } from './mpk.service';

describe('MpkController', () => {
  let controller: MpkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MpkController],
      providers: [MpkService],
    }).compile();

    controller = module.get<MpkController>(MpkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
