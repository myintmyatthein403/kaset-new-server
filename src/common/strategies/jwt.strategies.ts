import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as path from 'path';
import * as fs from 'fs';
import { Payload } from '../types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(path.resolve(`src/keys/jwt_public.pem`)),
      algorithms: ['RS256'],
    });
  }

  validate(payload: Payload) {
    if (!payload) {
      console.log('Payload is empty!');
      throw new UnauthorizedException();
    }
    console.log(
      'payload', payload
    )
    return {
      user_id: payload.sub,
      role: payload.role ? payload.role?.name : "",
    };
  }
}
