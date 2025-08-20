import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfig from './common/config/postgres.config';
import { LoggerModule } from './common/services/logger/logger.module';
import { TokenModule } from './common/services/token/token.module';
import { AuthModule } from './modules/auth-services/auth/auth.module';
import { UserModule } from './modules/user-services/user/user.module';
import { WinstonLoggerService } from './common/services/logger/winston-logger.service';
import { RoleModule } from './modules/user-services/role/role.module';
import { PermissionModule } from './modules/user-services/permission/permission.module';
import { UserProfileModule } from './modules/user-services/user-profile/user-profile.module';
import { MediaModule } from './modules/media-services/media/media.module';
import { TrackModule } from './modules/music-services/track/track.module';
import { GenresModule } from './modules/music-services/genres/genres.module';
import { SlideShowModule } from './modules/web-services/slide-show/slide-show.module';
import { DataCollectModule } from './modules/beta-services/data-collect/data-collect.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig,]
    }),

    TypeOrmModule.forRootAsync({
      inject: [postgresConfig.KEY],
      useFactory: (config: ConfigType<typeof postgresConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        autoLoadEntities: true,
        synchronize: config.sync as boolean, // ❗ Only for development
      }),
    }),

    LoggerModule,
    TokenModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    UserProfileModule,
    MediaModule,
    TrackModule,
    GenresModule,
    SlideShowModule,
    DataCollectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly winstonLogger: WinstonLoggerService
  ) { }

  async onModuleInit() {
    this.winstonLogger.info('🎉 Connected to PostgreSQL')
    // this.winstonLogger.info('🎉 Connected to MongoDB')
    // this.winstonLogger.info('🎉 Connected to Redis')
  }
}
