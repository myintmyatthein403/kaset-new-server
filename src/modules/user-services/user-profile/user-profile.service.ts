import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { UserProfile } from './entities/user-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService extends BaseService<UserProfile> {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {
    super(userProfileRepository);
  }
}
