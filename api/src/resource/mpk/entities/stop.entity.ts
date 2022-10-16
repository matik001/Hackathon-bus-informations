// (stop_id integer, stop_code varchar(50), stop_name varchar(255), stop_lat varchar(255), stop_lon varchar(255))

import internal from 'stream';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('stops')
export class StopEntity {
  @PrimaryColumn()
  stop_id: number;

  @Column()
  stop_code: string;

  @Column()
  stop_name: string;

  @Column()
  stop_name_lower: string;

  @Column()
  stop_lat: string;

  @Column()
  stop_lon: string;

  @Column()
  buses: string;
}
