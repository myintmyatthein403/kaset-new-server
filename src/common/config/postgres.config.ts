import { registerAs } from '@nestjs/config';
// import { WinstonLoggerService } from '../services/logger/winston-logger.service';

export default registerAs('postgres', () => {
  // const winstonLogger = new WinstonLoggerService()

  // winstonLogger.debug('🛠  Connecting to PostgreSQL...');

  return {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || 'test_db',
    sync: process.env.TYPEORM_SYNC || true,
  }
});
