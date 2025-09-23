import { IsEmail, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('social-links')
export class SocialLink extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  facebook_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  instagram_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  youtube_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  tiktok_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  twitter_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  linkedin_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsEmail()
  @IsOptional()
  contact_email?: string;
}
