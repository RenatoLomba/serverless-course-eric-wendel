import { INestApplication } from '@nestjs/common';

import { createApp } from './app';
import { CommitsApiProvider } from './commits/commits-api.provider';
import { CommitsService } from './commits/commits.service';

let cachedApp: INestApplication;

export const handler = async () => {
  if (!cachedApp) {
    cachedApp = await createApp();
  }

  await cachedApp.init();

  const commitsApiProvider = cachedApp.get(CommitsApiProvider);
  const commitMessage = await commitsApiProvider.getNewCommitMessage();

  const commitsService = cachedApp.get(CommitsService);
  await commitsService.createCommit({
    message: commitMessage,
  });

  return {
    statusCode: 200,
  };
};
