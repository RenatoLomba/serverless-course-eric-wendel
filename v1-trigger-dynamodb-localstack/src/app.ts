import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export const createApp = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  return app;
};
