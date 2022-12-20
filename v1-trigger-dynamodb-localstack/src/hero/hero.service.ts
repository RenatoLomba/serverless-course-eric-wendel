import type { DynamoDB } from 'aws-sdk';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateHeroDto } from './dto/create-hero.dto';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService {
  constructor(@Inject('DYNAMODB') private readonly dynamoDb: DynamoDB) {}

  private tableName = process.env.HEROES_TABLE;

  async create({ name, power }: CreateHeroDto): Promise<Hero> {
    const id = new Date().getTime().toString();
    const createdAt = new Date().toISOString();

    const params = {
      TableName: this.tableName,
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
      await this.dynamoDb
        .putItem({
          ...params,
        })
        .promise();
    } catch (err) {
      console.error('DYNAMODB CREATE HERO', err.stack);

      throw new InternalServerErrorException("Could't create item");
    }

    return {
      id,
      name,
      power,
      createdAt,
    };
  }

  async getAll(): Promise<any[]> {
    const heroes = await this.dynamoDb
      .scan({ TableName: this.tableName })
      .promise();

    return heroes.Items.map((i) => {
      const result = {};

      Object.entries(i).forEach(([key, val]) => {
        result[key] = val.S;
      });

      return result;
    });
  }
}
