import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StopEntity } from './entities/stop.entity';
import { MpkInterface } from './interfaces/mpk.interface';
import { VehicleType } from './types/vehicle-info.type';

@Injectable()
export class MpkService implements MpkInterface {
  constructor(
    @InjectRepository(StopEntity)
    private readonly stopRepository: Repository<StopEntity>,
  ) {}

  async getStops(): Promise<Array<string>> {
    return (
      await this.stopRepository
        .createQueryBuilder('stops')
        .select('DISTINCT stops.stop_name_lower')
        .orderBy('stop_name_lower')
        .getRawMany()
    ).reduce((acc: Array<string>, stp) => {
      acc.push(stp.stop_name_lower);
      return acc;
    }, []);
  }

  async getStopInfo(stop_name: string): Promise<StopEntity> {
    return await this.stopRepository.findOneBy({
      stop_name_lower: stop_name,
    });
  }

  async getBusesForStop(stop_name: string): Promise<Array<string>> {
    const stops = await this.stopRepository.findBy({
      stop_name_lower: stop_name,
    });
    if (!stops || stops.length === 0) {
      throw new NotFoundException();
    }
    // todo: merge and remove duplicates
    const { buses } = stops[0];
    return buses.split(';');
  }

  async getBusesLocationForStop(
    stop_name: string,
  ): Promise<Array<VehicleType>> {
    const communicationTransports = await this.getBusesForStop(stop_name);
    const mpk_url = 'https://mpk.wroc.pl/bus_position';
    const buses = [];
    const trams = [];
    communicationTransports.map((ct) => {
      if (+ct < 100) {
        trams.push(ct);
      } else {
        buses.push(ct);
      }
    });

    const buses_string = buses
      .map((b) => {
        const encodedKey = encodeURIComponent('busList[bus][]');
        const encodedValue = encodeURIComponent(`${b}`);
        return encodedKey + '=' + encodedValue;
      })
      .join('&');
    const trams_string = trams
      .map((b) => {
        const encodedKey = encodeURIComponent('busList[tram][]');
        const encodedValue = encodeURIComponent(`${b}`);
        return encodedKey + '=' + encodedValue;
      })
      .join('&');

    const payload = mpk_url + '?' + buses_string + '&' + trams_string;
    const response = await fetch(mpk_url, {
      method: 'POST',
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9,pl;q=0.8',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      mode: 'cors',
      credentials: 'include',
      body: payload,
    });

    return await response.json();
  }
}
