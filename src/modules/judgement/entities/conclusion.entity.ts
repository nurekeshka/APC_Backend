import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Conclusion {
  @PrimaryColumn('varchar', { length: 50 })
  ConclusionID: string;

  @Column('timestamp')
  registrationDate: Date;

  @Column('varchar', { length: 255 })
  position: string;

  @Column('varchar', { length: 50 })
  region: string;

  @Column('text')
  plannedActions: string;

  @Column('timestamp')
  eventDate: Date;

  @Column('varchar', { length: 100 })
  eventPlace: string;

  @Column('varchar', { length: 255 })
  investigator: string;

  @Column('varchar', { length: 100 })
  status: string;

  @Column('text')
  eventRelation: string;

  @Column('varchar', { length: 255 })
  investigationType: string;

  @Column('boolean')
  isBusinessRelated: boolean;

  @Column('text')
  justification: string;

  @Column('text')
  actionResult: string;
}