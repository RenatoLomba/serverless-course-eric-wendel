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

  private readonly tableName = process.env.HEROES_TABLE;

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

  async getAll(): Promise<Hero[]> {
    const heroes = await this.dynamoDb
      .scan({ TableName: this.tableName })
      .promise();

    return heroes.Items.map((i) => this.mapResultItem(i));
  }

  private mapResultItem(item: DynamoDB.AttributeMap) {
    const result = {} as Hero;

    Object.entries(item).forEach(([key, val]) => {
      result[key] = val.S;
    });

    return result;
  }

  async getById(id: string): Promise<Hero | null> {
    let hero: Hero | null = null;

    try {
      const data = await this.dynamoDb
        .getItem({
          TableName: this.tableName,
          Key: {
            id: { S: id },
          },
        })
        .promise();

      hero = !!data.Item ? this.mapResultItem(data.Item) : null;
    } catch (err) {
      console.error('DYNAMODB GET ITEM ERROR', err.stack);
      throw new InternalServerErrorException('Could not get item');
    }

    return hero;
  }

  async update(id: string, name: string): Promise<void> {
    try {
      await this.dynamoDb
        .updateItem({
          TableName: this.tableName,
          Key: {
            id: { S: id },
          },
          UpdateExpression: 'set #name = :val1',
          ExpressionAttributeNames: {
            '#name': 'name',
          },
          ExpressionAttributeValues: {
            ':val1': {
              S: name,
            },
          },
        })
        .promise();
    } catch (err) {
      console.error('DYNAMODB UPDATE ITEM ERROR', err.stack);
    }
  }
}
