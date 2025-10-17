import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { LoggerModule } from 'src/common/services/logger/logger.module';
import { TokenModule } from 'src/common/services/token/token.module';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { JwtStrategy } from 'src/common/strategies/jwt.strategies';
import { Role } from 'src/modules/user-services/role/entities/role.entity';

@Module({
  imports: [
    LoggerModule,
    TokenModule,
    TypeOrmModule.forFeature([
      User, Role
    ]),
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.resolve('./src/keys/jwt_private.pem'),
      ),
      publicKey: fs.readFileSync(
        path.resolve('./src/keys/jwt_public.pem'),
      ),
      signOptions: {
        algorithm: 'RS256', // Use RS256 (asymmetric) for PEM keys
        expiresIn: '60m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
