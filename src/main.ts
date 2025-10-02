import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './common/config/swagger-ui.config';
import { WinstonLoggerService } from './common/services/logger/winston-logger.service';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.CORS_DOMAINS?.split(',') || [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  app.setGlobalPrefix('/api')

  app.use(
    json({
      verify: (req: any, res, buf) => {
        if (req.originalUrl.includes('/stripe-webhook')) {
          req.rawBody = buf.toString();
        }
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api/v1/documentation', app, document);

  await app.listen(process.env.PORT ?? 3000);
  const winstonLogger = await app.resolve(WinstonLoggerService);
  winstonLogger.info(`🚀 Application listening on port ${process.env.PORT || 3000}`);
}
bootstrap();
