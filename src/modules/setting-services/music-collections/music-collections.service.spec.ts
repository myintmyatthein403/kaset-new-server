import { Test, TestingModule } from '@nestjs/testing';
import { MusicCollectionsService } from './music-collections.service';

describe('MusicCollectionsService', () => {
  let service: MusicCollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicCollectionsService],
    }).compile();

    service = module.get<MusicCollectionsService>(MusicCollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
