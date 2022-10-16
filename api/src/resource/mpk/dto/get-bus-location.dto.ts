import { BusLocationDto } from './bus-location.dto';
import { StopDto } from './stop.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetBusLocationDto {
  @ApiProperty()
  stop: StopDto;

  @ApiProperty()
  vehiclePositions: Array<BusLocationDto>;
}
