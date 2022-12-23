import { DynamoDB, Endpoint } from 'aws-sdk';

import { Module } from '@nestjs/common';

import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';

@Module({
  controllers: [CommitsController],
  providers: [
    CommitsService,
    {
      provide: 'DYNAMODB',
      useFactory: () => {
        const isLocal = process.env.NODE_ENV === 'local';

        const dynamoDBConfig: DynamoDB.ClientConfiguration = {
          region: process.env.AWS_REGION,
        };

        if (isLocal) {
          const host = process.env.LOCALSTACK_HOSTNAME;

          dynamoDBConfig.endpoint = new Endpoint(`http://${host}:4566`);
        }

        return new DynamoDB.DocumentClient(dynamoDBConfig);
      },
    },
  ],
})
export class CommitsModule {}
