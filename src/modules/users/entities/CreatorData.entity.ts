import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity'; 

@Entity()
export class CreatorDATA {
  @PrimaryColumn('varchar', { length: 15 })
  CreatorIIN: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @Column('varchar', { length: 100 })
  workplace: string;
}