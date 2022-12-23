import { DynamoDB, Endpoint } from 'aws-sdk';

import { Module } from '@nestjs/common';

import { config } from '../config';
import { CommitSchedulerHandler } from './commit-scheduler.handler';
import { CommitsApiProvider } from './commits-api.provider';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';

@Module({
  controllers: [CommitsController],
  exports: [CommitSchedulerHandler],
  providers: [
    CommitsService,
    CommitsApiProvider,
    CommitSchedulerHandler,
    {
      provide: 'DYNAMODB',
      useFactory: () => {
        const isLocal = config.NodeEnv === 'local';

        const dynamoDBConfig: DynamoDB.ClientConfiguration = {
          region: config.AwsRegion,
        };

        if (isLocal) {
          const host = config.LocalStackHostname;

          dynamoDBConfig.endpoint = new Endpoint(`http://${host}:4566`);
        }

        return new DynamoDB.DocumentClient(dynamoDBConfig);
      },
    },
  ],
})
export class CommitsModule {}
