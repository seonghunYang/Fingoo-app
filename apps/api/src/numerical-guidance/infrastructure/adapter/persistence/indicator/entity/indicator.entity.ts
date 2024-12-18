import { IndicatorType } from 'src/commons/type/type-definition';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity({ name: 'indicator' })
export class IndicatorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  type: IndicatorType;

  @Column({ nullable: true })
  exchange: string;
}
