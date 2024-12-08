import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Conclusion } from './conclusion.entity';

@Entity()
export class Approval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Conclusion)
  conclusion: Conclusion;

  @Column()
  position: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  rejectionReason: string;
}
