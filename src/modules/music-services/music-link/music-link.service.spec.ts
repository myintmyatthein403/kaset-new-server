import { Test, TestingModule } from '@nestjs/testing';
import { MusicLinkService } from './music-link.service';

describe('MusicLinkService', () => {
  let service: MusicLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicLinkService],
    }).compile();

    service = module.get<MusicLinkService>(MusicLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
