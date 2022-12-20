import { DynamoDB, Endpoint } from 'aws-sdk';

import { Module } from '@nestjs/common';

import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  controllers: [HeroController],
  providers: [
    HeroService,
    {
      provide: 'DYNAMODB',
      useFactory: () => {
        const isLocal = !!process.env.IS_LOCAL;

        const dynamoDbConfig: DynamoDB.ClientConfiguration = {
          region: process.env.AWS_REGION,
        };

        if (isLocal) {
          const host = process.env.LOCALSTACK_HOST;

          dynamoDbConfig.endpoint = new Endpoint(`http://${host}:4566`);
        }

        return new DynamoDB(dynamoDbConfig);
      },
    },
  ],
})
export class HeroModule {}
