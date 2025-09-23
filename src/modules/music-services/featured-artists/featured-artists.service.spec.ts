import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedArtistsService } from './featured-artists.service';

describe('FeaturedArtistsService', () => {
  let service: FeaturedArtistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturedArtistsService],
    }).compile();

    service = module.get<FeaturedArtistsService>(FeaturedArtistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
