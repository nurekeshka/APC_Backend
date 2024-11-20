import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type SexType = 'male' | 'female';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  sex: SexType;

  @Column()
  role: string;

  @Column()
  region: string;

  @Column({ select: false })
  password: string;
}
