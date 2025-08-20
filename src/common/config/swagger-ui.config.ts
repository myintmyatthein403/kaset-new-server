import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Job Portal API')
  .setDescription('API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
