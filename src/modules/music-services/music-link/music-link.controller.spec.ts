import { Test, TestingModule } from '@nestjs/testing';
import { MusicLinkController } from './music-link.controller';
import { MusicLinkService } from './music-link.service';

describe('MusicLinkController', () => {
  let controller: MusicLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicLinkController],
      providers: [MusicLinkService],
    }).compile();

    controller = module.get<MusicLinkController>(MusicLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
