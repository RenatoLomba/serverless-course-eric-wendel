import axios from 'axios';
import { load } from 'cheerio';

import { INestApplication } from '@nestjs/common';

import { createApp } from './app';
import { CommitsService } from './commits/commits.service';
import { config } from './config';

let cachedApp: INestApplication;

export const handler = async () => {
  const { data } = await axios.get(config.APICommitMessagesURL);

  const $ = load(data);

  const [commitMessage] = $('#content').text().trim().split('\n');

  if (!cachedApp) {
    cachedApp = await createApp();
  }

  await cachedApp.init();

  const commitsService = cachedApp.get(CommitsService);

  await commitsService.createCommit({
    message: commitMessage,
  });

  return {
    statusCode: 200,
  };
};
