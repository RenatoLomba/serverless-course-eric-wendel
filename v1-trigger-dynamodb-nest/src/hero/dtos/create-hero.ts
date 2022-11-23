import { IsOptional, IsString, Length } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @Length(2, 200)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  power?: string;
}
