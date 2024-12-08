import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conclusion } from './Conclusion.entity';

@Entity()
export class Defender {
  @PrimaryColumn('varchar', { length: 15 })
  DefenderIIN: string;

  @ManyToOne(() => Conclusion)
  @JoinColumn({ name: 'ConclusionID' })
  Conclusion: Conclusion;

  @Column('varchar', { length: 255 })
  name: string;
}