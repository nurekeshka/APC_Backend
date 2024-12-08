import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conclusion } from './Conclusion.entity';

@Entity()
export class CaseRecords {
  @PrimaryColumn('varchar', { length: 50 })
  CaseRecordsNumber: string;

  @ManyToOne(() => Conclusion)
  @JoinColumn({ name: 'ConclusionID' })
  Conclusion: Conclusion;

  @Column('timestamp')
  registrationDate: Date;

  @Column('text')
  article: string;

  @Column('text')
  solution: string;

  @Column('text')
  description: string;
}