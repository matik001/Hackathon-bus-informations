import { Controller, Get, Param } from '@nestjs/common';
import { MpkService } from './mpk.service';
import { ApiOperation } from '@nestjs/swagger';
import { GetBusLocationDto } from './dto/get-bus-location.dto';
import { StopDto } from './dto/stop.dto';

@Controller('mpk')
export class MpkController {
  constructor(private readonly mpkService: MpkService) {}

  @Get('/:stop_name')
  @ApiOperation({ description: '' })
  async getBusesForStop(
    @Param('stop_name') stop_name: string,
  ): Promise<Array<string>> {
    return await this.mpkService.getBusesForStop(stop_name);
  }

  @Get('/location/:stop_name')
  @ApiOperation({ description: '' })
  async getLocationForStop(
    @Param('stop_name') stop_name: string,
  ): Promise<GetBusLocationDto> {
    const stopInfo = await this.mpkService.getStopInfo(stop_name);
    const vehiclesLocation = await this.mpkService.getBusesLocationForStop(
      stop_name,
    );

    const result = new GetBusLocationDto();
    result.stop = StopDto.fromEntity(stopInfo);
    result.vehiclePositions = vehiclesLocation;
    return result;
  }
}
