import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Conclusion } from '../conclusion.entity';

@Entity()
export class Defender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  iin: string;

  @ManyToOne(() => Conclusion)
  conclusion: Conclusion;

  @Column()
  name: string;
}
