import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conclusion } from './Conclusion.entity';

@Entity()
export class ApprovalProcess {
  @PrimaryGeneratedColumn()
  ApprovalProcessID: number;

  @ManyToOne(() => Conclusion)
  @JoinColumn({ name: 'ConclusionID' })
  Conclusion: Conclusion;

  @Column('varchar', { length: 15 })
  position: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  status: string;

  @Column('timestamp')
  date: Date;

  @Column('text')
  rejectionReason: string;
}