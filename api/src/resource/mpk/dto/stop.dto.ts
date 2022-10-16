import { StopEntity } from '../entities/stop.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StopDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  x: number;

  @ApiProperty()
  y: number;

  static fromEntity(entity: StopEntity): StopDto {
    const stopDto = new StopDto();
    stopDto.name = entity.stop_name;
    stopDto.x = +entity.stop_lon;
    stopDto.y = +entity.stop_lat;
    return stopDto;
  }
}
