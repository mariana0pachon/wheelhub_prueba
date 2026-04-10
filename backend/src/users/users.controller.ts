import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Elements } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('elements') elements?: Elements[],
    @Query('fromBirthday') fromBirthday?: string,
    @Query('toBirthday') toBirthday?: string,
    @Query('fromLuckyNumber') fromLuckyNumber?: number,
    @Query('toLuckyNumber') toLuckyNumber?: number,
  ) {
    if ((!fromBirthday && toBirthday) || (fromBirthday && !toBirthday)) {
      throw new BadRequestException(
        'both fromBirthday and toBirthday should be defined',
      );
    }

    if (
      (!fromLuckyNumber && toLuckyNumber) ||
      (fromLuckyNumber && !toLuckyNumber)
    ) {
      throw new BadRequestException(
        'both fromLuckyNumber and toLuckyNumber should be defined',
      );
    }

    if (
      fromLuckyNumber &&
      toLuckyNumber &&
      (fromLuckyNumber < 0 ||
        toLuckyNumber < 0 ||
        fromLuckyNumber > toLuckyNumber)
    ) {
      throw new BadRequestException(
        'fromLuckyNumber must be <= than toLuckyNumber and they should both be >=0',
      );
    }

    return this.usersService.findAll(
      elements ? [elements].flat() : [],
      fromBirthday ? new Date(fromBirthday) : undefined,
      toBirthday ? new Date(toBirthday) : undefined,
      fromLuckyNumber ? fromLuckyNumber : undefined,
      toLuckyNumber ? toLuckyNumber : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
