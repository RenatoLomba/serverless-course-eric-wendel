import { Injectable } from '@nestjs/common';

import { CommitsApiProvider } from './commits-api.provider';
import { CommitsService } from './commits.service';

@Injectable()
export class CommitSchedulerHandler {
  constructor(
    private readonly commitsApiProvider: CommitsApiProvider,
    private readonly commitsService: CommitsService,
  ) {}

  async handle() {
    const message = await this.commitsApiProvider.getNewCommitMessage();

    await this.commitsService.createCommit({
      message,
    });

    return {
      statusCode: 200,
    };
  }
}
