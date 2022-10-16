import { ApiProperty } from '@nestjs/swagger';

export enum VehicleEnum {
  bus = 'bus',
  tram = 'tram',
}

export class BusLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: VehicleEnum })
  type: VehicleEnum;

  @ApiProperty()
  x: number;

  @ApiProperty()
  y: number;

  @ApiProperty()
  k: number;
}
