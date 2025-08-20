import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

// 2025-07-08 12:08:27 [INFO] [AuthService] User logged in successfully.
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    ({ timestamp, level, message, context, trace, stack, ...meta }) => {
      let logString = `${timestamp} [${level.toUpperCase()}]`;

      if (context) {
        logString += ` [${context}]`;
      }

      logString += ` ${message}`;

      if (trace || stack) {
        logString += `\n${trace || stack}`;
      }

      if (Object.keys(meta).length) {
        logString += `\n${JSON.stringify(meta, null, 2)}`;
      }

      return logString;
    },
  ),
);

@Injectable()
export class WinstonLoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: logFormat,
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }),
        new winston.transports.File({
          filename: 'logs/errors.log',
          level: 'error',
        }),
      ],
    });
  }

  info(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
