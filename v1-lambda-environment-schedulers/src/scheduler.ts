import { INestApplication } from '@nestjs/common';

import { createApp } from './app';
import { CommitSchedulerHandler } from './commits/commit-scheduler.handler';

let cachedApp: INestApplication;

export const handler = async () => {
  if (!cachedApp) {
    cachedApp = await createApp();
  }

  await cachedApp.init();

  return await cachedApp.get(CommitSchedulerHandler).handle();
};
