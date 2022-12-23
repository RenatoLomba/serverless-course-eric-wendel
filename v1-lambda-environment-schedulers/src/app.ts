import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export const createApp = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  return app;
};
