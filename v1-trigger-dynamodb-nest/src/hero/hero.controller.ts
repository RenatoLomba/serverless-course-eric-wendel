import { Body, Controller, Post } from '@nestjs/common';

import { CreateHeroDto } from './dtos/create-hero';
import { HeroService } from './hero.service';

@Controller('/heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  async createHero(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }
}
