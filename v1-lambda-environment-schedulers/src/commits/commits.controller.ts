import { Controller, Get } from '@nestjs/common';

import { CommitsService } from './commits.service';

@Controller('/api/commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Get()
  commits() {
    return this.commitsService.getCommits();
  }
}
