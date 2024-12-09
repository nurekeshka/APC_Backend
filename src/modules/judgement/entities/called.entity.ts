import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Conclusion } from './conclusion.entity';

@Entity()
export class Called {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Conclusion)
  conclusion: Conclusion;

  @Column()
  iin: string;

  @Column()
  name: string;

  @Column()
  pensionIin: string;

  @Column()
  workplace: string;

  @Column()
  lastCall: string;

  @Column()
  caller: string;

  @Column()
  status: string;

  @Column({ type: 'timestamptz' })
  arrivedAt: Date;

  @Column({ type: 'timestamptz' })
  leftAt: Date;

  @Column()
  reason: string;
}
