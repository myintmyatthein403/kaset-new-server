import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    JwtModule.register({
      privateKey: fs.readFileSync(path.resolve(`src/keys/jwt_private.pem`)),
      publicKey: fs.readFileSync(path.resolve(`src/keys/jwt_public.pem`)),
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule { }
