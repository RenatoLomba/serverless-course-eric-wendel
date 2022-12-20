import { Controller, Post, Body, Get } from '@nestjs/common';

import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroService } from './hero.service';

@Controller('/api/heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Get()
  heroes() {
    return this.heroService.getAll();
  }
}
