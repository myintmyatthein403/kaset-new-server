import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMediaLink } from 'src/modules/setting-services/social-media-links/entities/social-media-link.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ACCOUNT_STATUS } from 'src/common/enums/enums';
/*
data:  {
  name: 'Kylie Holt',
  pairs: [
    {
      id: 'V55GqE_G7dOZVKeUAzvGO',
      dropdownValue: '3a9986a0-67bf-4f6b-9db5-32b2e8c0cff0',
      textValue: 'Minima et dolore par'
    }
  ],
  slug: 'kylie-holt',
  location: 'Velit ex laborum nem',
  email: 'qusunygiqy@mailinator.com',
  bio: 'Perferendis quis ali'
}
*/

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(SocialMediaLink)
    private readonly socialMediaLinkRepository: Repository<SocialMediaLink>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    const {
      pairs,
      name,
      bio,
      slug,
      location,
      featured_video,
      claimable,
      profile_image,
      email,
      cover_image,
    } = createArtistDto;

    let role;

    role = await this.roleRepository.findOne({
      where: {
        name: 'Artist',
      },
    });

    if (!role) {
      console.log('role', role);
      let newRole = this.roleRepository.create({
        name: 'Artist',
      });
      role = await this.roleRepository.save(newRole);
    }

    let socialMediaLinks;

    // create Social Media Links
    if (pairs && pairs.length > 0) {
      socialMediaLinks = pairs.map((pair) =>
        this.socialMediaLinkRepository.create({
          platform: {
            id: pair.dropdownValue,
          },
          url: pair.textValue,
        }),
      );
      await this.socialMediaLinkRepository.save(socialMediaLinks);
    }

    const socialMediaIds = socialMediaLinks.map((social) => {
      return {
        id: social.id,
      };
    });

    // create User
    const userProfile = this.userProfileRepository.create({
      name,
      email,
      bio,
      slug,
      location,
      profile_image,
      cover_image,
      featured_video,
      social_media_links: socialMediaIds,
    });

    const newProfile = await this.userProfileRepository.save(userProfile);
    const passwordHash = (await bcrypt.hash('kasetpassword', 10)) as string;

    const user = this.userRepository.create({
      email: email ? email : `${name}@kaset-sample.com`,
      name,
      passwordHash,
      role: {
        id: role.id,
      },
      claimable: true,
      user_profile: {
        id: newProfile.id,
      },
    });

    await this.userRepository.save(user);

    // create Profile
    return newProfile;
  }

  async findAll(name = 'user') {
    const whereCondition: any = {
      role: {
        name: 'Artist',
      },
    };

    if (name == 'user') {
      whereCondition.status = ACCOUNT_STATUS.ACTIVE;
    }
    const users = await this.userRepository.find({
      where: whereCondition,
      relations: ['user_profile.social_media_links']
    });
    return users.map(user => ({ ...user.user_profile, userId: user.id, status: user.status }))
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  async findWithSlug(slug: string) {
    const user = await this.userRepository.findOne({
      where: {
        user_profile: {
          slug,
        },
      },
      relations: [
        'tracks',
        'albums'
      ]
    });
    return {
      ...user?.user_profile,
      tracks: user?.tracks,
      albums: user?.albums
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    console.log(updateArtistDto)
    const userProfile = await this.userRepository.findOne({
      where: {
        user_profile: {
          id,
        },
      },
    });
    if (!userProfile) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    if (updateArtistDto.pairs && updateArtistDto.pairs.length > 0) {
      console.log(updateArtistDto.pairs)
      const updatedLinks = updateArtistDto.pairs.map((pair) => {
        // Find the existing link in the database based on its ID
        const existingLink = userProfile.user_profile.social_media_links.find(
          (link) => link.id === pair.id,
        );
        console.log(existingLink);
        if (existingLink) {
          // If the link exists, update its properties
          existingLink.url = pair.textValue;
          existingLink.platform = { id: pair.dropdownValue } as any; // TypeORM will update the relation
          return existingLink;
        } else {
          // If the link doesn't exist, create a new one
          return this.socialMediaLinkRepository.create({
            url: pair.textValue,
            platform: { id: pair.dropdownValue } as any,
          });
        }
      });
      // Save all updated and new links in one go
      await this.socialMediaLinkRepository.save(updatedLinks);
      // Update the artist's social media links with the new list
      userProfile.user_profile.social_media_links = updatedLinks;
    }

    // 3. Update the other artist properties
    // This assumes your DTO has other properties like name, bio, etc.
    const { pairs, ...artistDetails } = updateArtistDto;
    this.userProfileRepository.merge(userProfile.user_profile, artistDetails);
    // 4. Save the artist
    return this.userProfileRepository.save(userProfile.user_profile);
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }

  async updateStatus(id: string, status: ACCOUNT_STATUS) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.status = status;
    return this.userRepository.save(user);
  }
}
