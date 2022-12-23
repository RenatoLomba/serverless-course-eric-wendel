import type { DynamoDB } from 'aws-sdk';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CommitsService {
  constructor(
    @Inject('DYNAMODB') private readonly dynamoDB: DynamoDB.DocumentClient,
  ) {}

  private readonly tableName = process.env.CommitMessagesTableName;

  async getCommits() {
    const data = await this.dynamoDB
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return data.Items;
  }
}
