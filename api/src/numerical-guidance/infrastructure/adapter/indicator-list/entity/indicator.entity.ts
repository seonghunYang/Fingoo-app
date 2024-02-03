import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class IndicatorEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  type: string;
}
