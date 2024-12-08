import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Conclusion } from './conclusion.entity';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Conclusion)
  conclusion: Conclusion;

  @Column({ type: 'date' })
  registrationDate: string;

  @Column()
  article: string;

  @Column()
  solution: string;

  @Column()
  description: string;
}
