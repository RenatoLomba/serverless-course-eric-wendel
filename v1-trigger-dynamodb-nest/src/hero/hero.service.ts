import type { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateHeroDto } from './dtos/create-hero';

@Injectable()
export class HeroService {
  constructor(@Inject('DYNAMODB') private dynamoDB: DynamoDB) {}

  async create({ name, power }: CreateHeroDto) {
    const TableName = process.env.DYNAMODB_TABLE;
    const id = uuid().toString();
    const createdAt = new Date().toISOString();

    const params = {
      TableName,
      Item: {
        id: { S: id },
        name: { S: name },
        createdAt: { S: createdAt },
      },
    } as DynamoDB.PutItemInput;

    if (power) {
      params.Item.power = { S: power };
    }

    try {
      await this.dynamoDB
        .putItem({
          ...params,
        })
        .promise();
    } catch (err) {
      console.error(err.stack);

      throw new InternalServerErrorException("Could't create item");
    }

    return {
      id,
      name,
      power,
      createdAt,
    };
  }
}
