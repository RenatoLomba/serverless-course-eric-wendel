import { DynamoDB, Endpoint } from 'aws-sdk';

import { Module } from '@nestjs/common';

import { config } from '../config';
import { CommitsApiProvider } from './commits-api.provider';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';

@Module({
  controllers: [CommitsController],
  exports: [CommitsApiProvider],
  providers: [
    CommitsService,
    CommitsApiProvider,
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
