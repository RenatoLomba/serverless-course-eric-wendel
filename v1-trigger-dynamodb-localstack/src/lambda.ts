import { configure as serverlessExpress } from '@vendia/serverless-express';

import { createApp } from './app';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await createApp();
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
