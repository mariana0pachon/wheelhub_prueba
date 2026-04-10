import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStarSign {
  ARIES = 'aries',
  TAURO = 'tauro',
  GEMINIS = 'géminis',
  CANCER = 'cáncer',
  LEO = 'leo',
  VIRGO = 'virgo',
  LIBRA = 'libra',
  ESCORPIO = 'escorpio',
  SAGITARIO = 'sagitario',
  CAPRICORNIO = 'capricornio',
  ACUARIO = 'acuario',
  PISCIS = 'piscis',
}

export enum Elements {
  FUEGO = 'fuego',
  AIRE = 'aire',
  AGUA = 'agua',
  TIERRA = 'tierra',
}

export const StarSignsByElement: Record<Elements, UserStarSign[]> = {
  [Elements.FUEGO]: [
    UserStarSign.ARIES,
    UserStarSign.LEO,
    UserStarSign.SAGITARIO,
  ],
  [Elements.AIRE]: [
    UserStarSign.GEMINIS,
    UserStarSign.LIBRA,
    UserStarSign.ACUARIO,
  ],
  [Elements.AGUA]: [
    UserStarSign.CANCER,
    UserStarSign.ESCORPIO,
    UserStarSign.PISCIS,
  ],
  [Elements.TIERRA]: [
    UserStarSign.TAURO,
    UserStarSign.VIRGO,
    UserStarSign.CAPRICORNIO,
  ],
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  avatar: Record<string, unknown> | null;

  @Column({ type: 'date', nullable: true })
  birthday: Date | null;

  @Column({ type: 'int', nullable: true })
  luckyNumber: number | null;

  @Column({ type: 'simple-array', nullable: true })
  superpowers: string[] | null;

  // Generado a partir del `birthday` en UserService.calculateStarSign(birthday)
  @Column({
    type: 'enum',
    enum: UserStarSign,
    nullable: true,
  })
  starSign: UserStarSign | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
