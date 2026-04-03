import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStarSign } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const starSign = this.calculateStarSign(
      new Date(createUserDto.birthday || ''),
    );
    const user = this.userRepository.create({ ...createUserDto, starSign });
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const toUpdate = await this.findOne(id);

    if (!toUpdate) throw NotFoundException;

    const starSign = this.calculateStarSign(
      new Date(updateUserDto.birthday || ''),
    );
    const updatedUser = Object.assign(toUpdate, { ...updateUserDto, starSign });

    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  private calculateStarSign(date?: Date): UserStarSign | null {
    console.log('HOLA aqui es calculateStarSign:');
    console.log(typeof date);
    console.log(date);

    if (!date || isNaN(date.getTime())) return null;

    const month = date.getMonth() + 1;
    const day = date.getDate();

    switch (true) {
      case (month === 3 && day >= 21) || (month === 4 && day <= 19):
        return UserStarSign.ARIES;
      case (month === 4 && day >= 20) || (month === 5 && day <= 20):
        return UserStarSign.TAURO;
      case (month === 5 && day >= 21) || (month === 6 && day <= 20):
        return UserStarSign.GEMINIS;
      case (month === 6 && day >= 21) || (month === 7 && day <= 22):
        return UserStarSign.CANCER;
      case (month === 7 && day >= 23) || (month === 8 && day <= 22):
        return UserStarSign.LEO;
      case (month === 8 && day >= 23) || (month === 9 && day <= 22):
        return UserStarSign.VIRGO;
      case (month === 9 && day >= 23) || (month === 10 && day <= 22):
        return UserStarSign.LIBRA;
      case (month === 10 && day >= 23) || (month === 11 && day <= 21):
        return UserStarSign.ESCORPIO;
      case (month === 11 && day >= 22) || (month === 12 && day <= 21):
        return UserStarSign.SAGITARIO;
      case (month === 12 && day >= 22) || (month === 1 && day <= 19):
        return UserStarSign.CAPRICORNIO;
      case (month === 1 && day >= 20) || (month === 2 && day <= 18):
        return UserStarSign.ACUARIO;
      default:
        return UserStarSign.PISCIS;
    }
  }
}
