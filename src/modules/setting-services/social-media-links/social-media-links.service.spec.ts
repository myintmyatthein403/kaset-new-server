import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaLinksService } from './social-media-links.service';

describe('SocialMediaLinksService', () => {
  let service: SocialMediaLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediaLinksService],
    }).compile();

    service = module.get<SocialMediaLinksService>(SocialMediaLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
