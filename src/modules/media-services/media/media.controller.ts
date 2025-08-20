import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Body,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Media, MediaType } from './entities/media.entity';

const storageOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|webm|mov|avi|mkv)$/)) {
      return cb(new BadRequestException('Only image and video files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
};

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('single')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        media: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('media', storageOptions))
  async uploadSingleMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const mediaType = file.mimetype.includes('image') ? MediaType.IMAGE : MediaType.VIDEO;

    const createMediaDto: CreateMediaDto = {
      url: `/uploads/${file.filename}`,
      mimetype: file.mimetype,
      type: mediaType,
      title: title || file.originalname,
    };

    const newMedia = await this.mediaService.create(createMediaDto);
    return newMedia;
  }

  @Post('multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        media: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('media', 10, storageOptions))
  async uploadMultipleMedia(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.');
    }

    const mediaList: Media[] = [];
    for (const file of files) {
      const mediaType = file.mimetype.includes('image') ? MediaType.IMAGE : MediaType.VIDEO;
      const createMediaDto: CreateMediaDto = {
        url: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        type: mediaType,
        title: file.originalname,
      };
      const newMedia = await this.mediaService.create(createMediaDto);
      mediaList.push(newMedia);
    }

    return mediaList;
  }

  @Post('mixed')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profileImage: { type: 'string', format: 'binary' },
        introVideo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profileImage', maxCount: 1 },
    { name: 'introVideo', maxCount: 1 },
  ], storageOptions))
  async uploadMixedMedia(
    @UploadedFiles() files: { profileImage?: Express.Multer.File[], introVideo?: Express.Multer.File[] }
  ) {
    if (!files.profileImage && !files.introVideo) {
      throw new BadRequestException('No files uploaded.');
    }

    const mediaList: Media[] = [];
    if (files.profileImage && files.profileImage.length > 0) {
      const file = files.profileImage[0];
      const createMediaDto: CreateMediaDto = {
        url: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        type: MediaType.IMAGE,
        title: 'Profile Image',
      };
      mediaList.push(await this.mediaService.create(createMediaDto));
    }

    if (files.introVideo && files.introVideo.length > 0) {
      const file = files.introVideo[0];
      const createMediaDto: CreateMediaDto = {
        url: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        type: MediaType.VIDEO,
        title: 'Intro Video',
      };
      mediaList.push(await this.mediaService.create(createMediaDto));
    }

    return mediaList;
  }

  @Post('any')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // This is a generic representation for any file fields
        anyFile: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor(storageOptions))
  async uploadAnyMedia(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.');
    }

    const mediaList: Media[] = [];
    for (const file of files) {
      const mediaType = file.mimetype.includes('image') ? MediaType.IMAGE : MediaType.VIDEO;
      const createMediaDto: CreateMediaDto = {
        url: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        type: mediaType,
        title: file.originalname,
      };
      const newMedia = await this.mediaService.create(createMediaDto);
      mediaList.push(newMedia);
    }

    return mediaList;
  }
}
