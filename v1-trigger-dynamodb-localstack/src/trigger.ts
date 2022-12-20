import type { DynamoDBStreamEvent } from 'aws-lambda';

import { INestApplication } from '@nestjs/common';

import { createApp } from './app';
import { HeroService } from './hero/hero.service';

let cachedApp: INestApplication;

export const handler = async (event: DynamoDBStreamEvent) => {
  if (event.Records[0].eventName !== 'INSERT')
    return {
      statusCode: 400,
    };

  if (!cachedApp) {
    cachedApp = await createApp();
    await cachedApp.init();
  }

  const heroService = cachedApp.get(HeroService);

  const heroId = event.Records[0].dynamodb.Keys.id.S;
  const hero = await heroService.getById(heroId);

  if (!hero) {
    return {
      statusCode: 400,
    };
  }

  await heroService.update(heroId, hero.name + ' UPDATED BY TRIGGER');

  return {
    statusCode: 200,
  };
};
