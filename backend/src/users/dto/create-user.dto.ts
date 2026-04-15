import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UserStarSign } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsObject()
  public avatar?: Record<string, unknown>;

  @IsOptional()
  @IsDateString()
  public birthday?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  public luckyNumber?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public superpowers?: string[];

  @IsOptional()
  @IsString()
  public starSign?: UserStarSign;
}
