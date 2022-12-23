import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommitsModule } from './commits/commits.module';

@Module({
  imports: [CommitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
