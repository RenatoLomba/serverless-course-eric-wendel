import type { DynamoDB } from 'aws-sdk';

import { Inject, Injectable } from '@nestjs/common';

import { config } from '../config';
import { CreateCommitDto } from './dtos/create-commit.dto';
import { Commit } from './entities/commit';

@Injectable()
export class CommitsService {
  constructor(
    @Inject('DYNAMODB') private readonly dynamoDB: DynamoDB.DocumentClient,
  ) {}

  private readonly tableName = config.CommitMessagesTableName;

  async getCommits(): Promise<Commit[]> {
    const data = await this.dynamoDB
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return data.Items as Commit[];
  }

  async createCommit(data: CreateCommitDto): Promise<Commit> {
    const dateNow = new Date();
    const id = dateNow.getTime().toString();
    const createdAt = dateNow.toISOString();

    await this.dynamoDB
      .put({
        TableName: this.tableName,
        Item: {
          id,
          createdAt,
          ...data,
        },
      })
      .promise();

    return {
      id,
      createdAt,
      ...data,
    };
  }
}
