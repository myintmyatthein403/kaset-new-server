import { Body, Controller, Get, Ip, Post, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { WinstonLoggerService } from 'src/common/services/logger/winston-logger.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: WinstonLoggerService,
  ) { }

  @Post('/login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginAuthDto: LoginAuthDto,
    @Ip() ip: string,
  ) {
    const userAgent = req.headers['user-agent'];
    try {
      return await this.authService.login(loginAuthDto, ip, userAgent);
    } catch (error) {
      this.logger.error(
        `Login failed for user: ${loginAuthDto.email}, IP: ${ip}, Error: ${error.message}`,
      );
      throw error;
    }
  }

  @Post('/register')
  async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() registerAuthDto: RegisterAuthDto,
    @Ip() ip: string,
  ) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/refresh-token')
  refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { refreshToken: string },
  ) {
    return this.authService.refreshToken(body.refreshToken);
  }

  /* @Post('/line-login')
  lineLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() lineLoginAuthDto: any
  ) {
    return this.authService.lineLogin(lineLoginAuthDto)
  } */
}
