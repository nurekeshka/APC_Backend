import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conclusion } from './Conclusion.entity';

@Entity()
export class Called {
  @PrimaryGeneratedColumn()
  CalledID: number;

  @ManyToOne(() => Conclusion)
  @JoinColumn({ name: 'ConclusionID' })
  Conclusion: Conclusion;

  @Column('varchar', { length: 15 })
  IIN: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 15 })
  pensionIIN: string;

  @Column('varchar', { length: 100 })
  pensionWorkplace: string;

  @Column('varchar', { length: 100 })
  lastCall: string;

  @Column('varchar', { length: 255 })
  caller: string;

  @Column('varchar', { length: 15 })
  status: string;

  @Column('timestamp')
  timeIn: Date;

  @Column('timestamp')
  timeOUT: Date;

  @Column('text')
  recallReason: string;
}