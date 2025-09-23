import { Controller } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { BaseController } from 'src/common/base/base.controller';
import { UserProfile } from './entities/user-profile.entity';

@Controller('user-profile')
export class UserProfileController extends BaseController<UserProfile> {
  constructor(private readonly userProfileService: UserProfileService) {
    super(userProfileService);
  }
}
