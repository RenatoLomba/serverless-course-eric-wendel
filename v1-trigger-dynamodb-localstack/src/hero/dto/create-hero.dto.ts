import { IsOptional, IsString, Length } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @Length(1, 20)
  name: string;

  @IsString()
  @Length(1, 40)
  @IsOptional()
  power?: string;
}
