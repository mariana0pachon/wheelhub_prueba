import { UserStarSign } from '../entities/user.entity';

export class CreateUserDto {
  public name: string;
  public avatar?: Record<string, unknown>;
  public birthday?: Date;
  public luckyNumber?: number;
  public superpowers?: string[];
  public starSign?: UserStarSign;
}
