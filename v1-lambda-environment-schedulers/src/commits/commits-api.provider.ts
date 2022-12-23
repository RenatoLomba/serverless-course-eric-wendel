import axios from 'axios';
import { load } from 'cheerio';

import { Injectable } from '@nestjs/common';

import { config } from '../config';

@Injectable()
export class CommitsApiProvider {
  private readonly apiUrl = config.APICommitMessagesURL;

  private readonly api = axios.create({
    baseURL: this.apiUrl,
  });

  async getNewCommitMessage(): Promise<string> {
    const { data } = await this.api.get('/');

    const $ = load(data);

    const [commitMessage] = $('#content').text().trim().split('\n');

    return commitMessage;
  }
}
