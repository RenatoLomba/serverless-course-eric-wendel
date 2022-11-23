import { DynamoDB } from 'aws-sdk';
import * as request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../../src/app.module';

const TableName = process.env.DYNAMODB_TABLE;

describe('Hero (e2e)', () => {
  let app: INestApplication;
  let dynamoDB: DynamoDB;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    dynamoDB = app.get<DynamoDB>('DYNAMODB');

    await dynamoDB
      .createTable({
        TableName,
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'name',
            KeyType: 'RANGE',
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
          {
            AttributeName: 'name',
            AttributeType: 'S',
          },
        ],
      })
      .promise();

    await app.init();
  });

  afterAll(async () => {
    await dynamoDB
      .deleteTable({
        TableName,
      })
      .promise();
  });

  it('should return status 400 when trying to create hero with no body', async () => {
    const expectedMessage = [
      'name must be longer than or equal to 2 characters',
      'name must be a string',
    ];

    const response = await request(app.getHttpServer()).post('/heroes');

    expect(response.statusCode).toStrictEqual(400);
    expect(response.body.message).toStrictEqual(expectedMessage);
  });

  it('should return status 400 when trying to create hero with invalid name', async () => {
    const expectedMessage = [
      'name must be longer than or equal to 2 characters',
    ];

    const response = await request(app.getHttpServer()).post('/heroes').send({
      name: 'A',
    });

    expect(response.statusCode).toStrictEqual(400);
    expect(response.body.message).toStrictEqual(expectedMessage);
  });

  it('should return status 200 when successfully created a hero', async () => {
    const body = { name: 'test-name', power: 'test-power' };

    const response = await request(app.getHttpServer())
      .post('/heroes')
      .send(body);

    expect(response.statusCode).toStrictEqual(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toStrictEqual(body.name);
    expect(response.body.power).toStrictEqual(body.power);
  });
});
