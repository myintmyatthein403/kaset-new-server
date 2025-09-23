import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaLinksController } from './social-media-links.controller';
import { SocialMediaLinksService } from './social-media-links.service';

describe('SocialMediaLinksController', () => {
  let controller: SocialMediaLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialMediaLinksController],
      providers: [SocialMediaLinksService],
    }).compile();

    controller = module.get<SocialMediaLinksController>(SocialMediaLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
