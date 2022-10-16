import { Controller, Get, Param } from '@nestjs/common';
import { MpkService } from './mpk.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('mpk')
export class MpkController {
  constructor(private readonly mpkService: MpkService) {}

  @Get('/:stop_name')
  @ApiOperation({ description: '' })
  async getBusesForStop(@Param('stop_name') stop_name: string) {
    return await this.mpkService.getBusesForStop(stop_name);
  }

  @Get('/location/:stop_name')
  @ApiOperation({ description: '' })
  async getLocationForStop(@Param('stop_name') stop_name: string) {
    return await this.mpkService.getBusesLocationForStop(stop_name);
  }
}
