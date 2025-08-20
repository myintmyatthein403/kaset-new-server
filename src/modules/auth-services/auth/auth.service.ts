import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ACCOUNT_STATUS } from 'src/common/enums/enums';
import { getLoginInfo } from 'src/common/utils/geo-device.util';
import { LoginInfo, Payload } from 'src/common/types/types';
// import { LoginAttemptService } from '../login-attempt/login-attempt.service';
import { WinstonLoggerService } from 'src/common/services/logger/winston-logger.service';
import { TokenService } from 'src/common/services/token/token.service';
import { JwtService } from '@nestjs/jwt';
// import { DeviceSessionService } from '../device-session/device-session.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly logger: WinstonLoggerService,

    // private readonly loginAttemptService: LoginAttemptService,

    // private readonly deviceSessionService: DeviceSessionService,

    private readonly tokenService: TokenService,

    private readonly jwtService: JwtService

  ) { }

  private async searchUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  private async validateUser(loginAuthDto: LoginAuthDto, loginInfo: LoginInfo) {
    const [user] = await Promise.all([
      this.userRepository.findOne({
        where: {
          email: loginAuthDto.email,
        },
      }),
    ]);

    if (!user) {
      throw new UnauthorizedException(
        `User doesn't exist. Please register first.`,
      );
    }

    let loginAttemptInfo = {
      ip_address: loginInfo.ip,
      user_agent: loginInfo.deviceDetails,
      is_success: false,
      reason: '',
      user: {
        id: user.id,
      },
    };

    let exceptionMessage: string | null = null;

    switch (user.status) {
      case ACCOUNT_STATUS.BANNED:
        exceptionMessage = `Your account has been banned. Please contact administrator for more information.`;
        loginAttemptInfo.reason = `Account has been banned.`;
        break;
      case ACCOUNT_STATUS.DEACTIVATED_BY_ADMIN:
        exceptionMessage =
          'Your account has been deactivated by admin. Please contact administrator for more information.';
        loginAttemptInfo.reason = 'Account has been deactivated by admin.';
        break;
      case ACCOUNT_STATUS.DEACTIVATED_BY_USER:
        exceptionMessage =
          'Your account has been deactivated. Please contact administrator for more information.';
        loginAttemptInfo.reason = 'Account has been deactivated.';
        break;
      case ACCOUNT_STATUS.LOCKED_TOO_MANY_ATTEMPTS:
        exceptionMessage =
          'Your account has been locked due to too many failed attempts. Please try again later or contact administrator for more information.';
        loginAttemptInfo.reason =
          'Account has been locked due to too many failed attempts.';
        break;
      case ACCOUNT_STATUS.PENDING_EMAIL_VERIFICATION:
        exceptionMessage =
          'Your account is pending email verification. Please verify your email first.';
        loginAttemptInfo.reason =
          'Account is pending due to email verification.';
        break;
      case ACCOUNT_STATUS.SUSPENDED_TEMPORARILY:
        exceptionMessage =
          'Your account has been suspended temporarily. Please try again later or contact administrator for more information.';
        loginAttemptInfo.reason = 'Account has been suspended temporarily.';
        break;
      case ACCOUNT_STATUS.SUSPENDED_PERMANENT:
        exceptionMessage =
          'Your account has been suspended permanently. Please contact administrator for more information.';
        loginAttemptInfo.reason = 'Account has been suspended permanently.';
        break;
      default:
        break;
    }

    if (exceptionMessage) {
      //await this.loginAttemptService.create(loginAttemptInfo);
      this.logger.info(
        `Login failed for user ${loginAuthDto.email}. Reason: ${exceptionMessage}`,
      );
      throw new UnauthorizedException(exceptionMessage);
    }

    const isMatch = (await bcrypt.compare(
      loginAuthDto.password,
      user.passwordHash,
    )) as boolean;

    if (!isMatch) {
      loginAttemptInfo = {
        ...loginAttemptInfo,
        reason: `Invalid credentials.`,
      };
      // await this.loginAttemptService.create(loginAttemptInfo);
      this.logger.info(
        `Login failed for user ${loginAuthDto.email}. Reason: Invalid credentials.`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    loginAttemptInfo = {
      ...loginAttemptInfo,
      is_success: true,
    };
    // await this.loginAttemptService.create(loginAttemptInfo);
    return user;
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.searchUser(registerAuthDto.email);

    if (user !== null) {
      this.logger.error(
        `Attempted to register with an existing email: ${registerAuthDto.email}`,
      );
      throw new ConflictException('This email is already in use.');
    }

    const passwordHash = (await bcrypt.hash(
      registerAuthDto.password,
      10,
    )) as string;

    let newUser = this.userRepository.create({
      ...registerAuthDto,
      passwordHash: passwordHash,
    });

    newUser = await this.userRepository.save(newUser);
    this.logger.info(
      `Successfully registered new user with ID: ${newUser.id} and email: ${newUser.email}`,
    );

    return {
      meta: {
        message: 'Successfully registered.',
      },
      data: instanceToPlain(newUser),
    };
  }

  async login(loginAuthDto: LoginAuthDto, ip: string, userAgent: string) {
    const loginInfo = getLoginInfo(ip, userAgent);
    const user = await this.validateUser(loginAuthDto, loginInfo);
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
    };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(
      { sub: payload.sub },
      loginAuthDto.rememberMe,
    );

    const deviceSessionInfo = {
      refresh_token_hash: refreshToken,
      device_info: loginInfo.deviceDetails,
      location_info: loginInfo.geoLocation,
      ip_address: loginInfo.ip,
      is_active: true,
      last_used_at: new Date(),
      user: user,
    };
    // await this.deviceSessionService.create(deviceSessionInfo as any);

    return {
      meta: {
        message: 'Successfully logged in.',
        accessToken,
        refreshToken,
      },
      data: instanceToPlain(user),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // 1. Verify the refresh token to get the payload
      // This will throw an error if the token is invalid or expired
      console.log(refreshToken)
      const payload: Payload = this.jwtService.verify(refreshToken);
      console.log(payload)

      // 2. Use the user data from the refresh token's payload
      // to generate a new access token
      const newAccessToken = this.tokenService.generateRefreshToken({
        sub: payload.sub,
      });

      // 3. Return the new access token
      return {
        meta: {
          accessToken: newAccessToken,
        },
      };

    } catch (error) {
      // If the refresh token is invalid, expired, or malformed,
      // throw an UnauthorizedException.
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }
  }

  logout() {
    return {
      meta: {
        message: 'Successfully logged out.',
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (user == null) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      meta: {
        message: 'Successfully get user profile',
      },
      data: instanceToPlain(user),
    };
  }

  /* async lineLogin(lineLoginAuthDto: any) {
    const employee = await this.employeeRepository.findOne({
      where: {
        line_user_id: lineLoginAuthDto.line_user_id
      }
    })


    if (employee) {
      let exceptionMessage: string | null = null;

      switch (employee.status) {
        case ACCOUNT_STATUS.BANNED:
          exceptionMessage = `Your account has been banned. Please contact administrator for more information.`;
          //loginAttemptInfo.reason = `Account has been banned.`;
          break;
        case ACCOUNT_STATUS.DEACTIVATED_BY_ADMIN:
          exceptionMessage =
            'Your account has been deactivated by admin. Please contact administrator for more information.';
          // loginAttemptInfo.reason = 'Account has been deactivated by admin.';
          break;
        case ACCOUNT_STATUS.DEACTIVATED_BY_USER:
          exceptionMessage =
            'Your account has been deactivated. Please contact administrator for more information.';
          //loginAttemptInfo.reason = 'Account has been deactivated.';
          break;
        case ACCOUNT_STATUS.LOCKED_TOO_MANY_ATTEMPTS:
          exceptionMessage =
            'Your account has been locked due to too many failed attempts. Please try again later or contact administrator for more information.';
          //loginAttemptInfo.reason =
          'Account has been locked due to too many failed attempts.';
          break;
        case ACCOUNT_STATUS.PENDING_EMAIL_VERIFICATION:
          exceptionMessage =
            'Your account is pending email verification. Please verify your email first.';
          //loginAttemptInfo.reason =
          'Account is pending due to email verification.';
          break;
        case ACCOUNT_STATUS.SUSPENDED_TEMPORARILY:
          exceptionMessage =
            'Your account has been suspended temporarily. Please try again later or contact administrator for more information.';
          //loginAttemptInfo.reason = 'Account has been suspended temporarily.';
          break;
        case ACCOUNT_STATUS.SUSPENDED_PERMANENT:
          exceptionMessage =
            'Your account has been suspended permanently. Please contact administrator for more information.';
          //loginAttemptInfo.reason = 'Account has been suspended permanently.';
          break;
        default:
          break;
      }

      if (exceptionMessage) {
        //  await this.loginAttemptService.create(loginAttemptInfo);
        this.logger.info(
          `Login failed for user ${lineLoginAuthDto.email}. Reason: ${exceptionMessage}`,
        );
        throw new UnauthorizedException(exceptionMessage);
      }

      const payload = {
        sub: employee.id,
        line_user_id: employee.line_user_id,
        status: employee.status,
      } as Payload;
      const accessToken = this.tokenService.generateAccessToken(payload);
      const refreshToken = this.tokenService.generateRefreshToken(
        { sub: payload.sub },
        false,
      );

      return {
        meta: {
          message: 'Successfully logged in.',
          accessToken,
          refreshToken,
        },
        data: instanceToPlain(employee),
      };
    }

    let newEmployee = this.employeeRepository.create(lineLoginAuthDto);
    newEmployee = await this.employeeRepository.save(newEmployee);

    return {
      user: newEmployee,
    };
  } */
}

