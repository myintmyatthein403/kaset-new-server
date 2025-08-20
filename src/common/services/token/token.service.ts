import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/common/types/types';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) { }

  generateAccessToken(payload: Payload) {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
    });
  }

  generateRefreshToken(payload: { sub: string }, rememberMe: boolean = false) {
    const TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d';
    const REMEMBERED_TOKEN_EXPIRES_IN =
      process.env.JWT_REMEMEBERED_REFRESH_TOKEN_EXPIRES_IN || '30d';
    return this.jwtService.sign(payload, {
      expiresIn: rememberMe ? REMEMBERED_TOKEN_EXPIRES_IN : TOKEN_EXPIRES_IN,
    });
  }
}
