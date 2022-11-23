import { DynamoDB, Endpoint } from 'aws-sdk';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero/hero.controller';
import { HeroService } from './hero/hero.service';

@Module({
  imports: [],
  controllers: [AppController, HeroController],
  providers: [
    AppService,
    HeroService,
    {
      provide: 'DYNAMODB',
      useFactory: () => {
        const isLocal = !!process.env.IS_OFFLINE;

        const dynamoDbConfig: DynamoDB.ClientConfiguration = {
          region: process.env.AWS_REGION,
        };

        if (isLocal) {
          const host = process.env.LOCALSTACK_HOST;

          dynamoDbConfig.endpoint = new Endpoint(`http://${host}:4566`);
        }

        const dynamoDB = new DynamoDB(dynamoDbConfig);

        return dynamoDB;
      },
    },
  ],
})
export class AppModule {}
