import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StopEntity } from './entities/stop.entity';
import { MpkInterface } from './interfaces/mpk.interface';
import { VehicleType } from './types/vehicle-info.type';
import {
  Client,
  LatLng,
  TransitMode,
  TravelMode,
  UnitSystem,
} from '@googlemaps/google-maps-services-js';

const api_key = '';

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
        .where("coalesce(stops.buses, '') <> ''")
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

    let payload = mpk_url + '?' + buses_string + '&' + trams_string;
    if (payload.endsWith('&')) {
      payload = payload.substring(0, payload.length - 1);
    }
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
    const stopInfo = await this.getStopInfo(stop_name);
    try {
      const vehiclesLocation: Array<VehicleType> = await response.json();
      const veh = vehiclesLocation.map((vehicleLoc) => {
        return {
          from: { lat: vehicleLoc.x, lng: vehicleLoc.y },
          to: { lat: +stopInfo.stop_lat, lng: +stopInfo.stop_lon },
          type: vehicleLoc.type.toString(),
        };
      });

      const result: Array<VehicleType> = [];

      const arr = veh;
      let i = 0;
      while (arr.length > 0) {
        const estimatedTimes = await this.getEstimatedTimes(
          api_key,
          arr.slice(0, 10),
        );

        estimatedTimes.forEach((value) => {
          result.push({
            name: vehiclesLocation[i].name,
            type: vehiclesLocation[i].type,
            k: vehiclesLocation[i].k,
            x: vehiclesLocation[i].x,
            y: vehiclesLocation[i].y,
            estimatedTime: value.text ?? '',
          });
          i++;
        });
        arr.splice(0, 10);
      }

      return result;
    } catch (e) {
      return [];
    }
  }
  async getEstimatedTimes(
    api_key: string,
    veh: Array<{ from: LatLng; to: LatLng; type: string }>,
  ) {
    const origins = veh.map((a) => a.from);
    const destinations = veh.map((a) => a.to);
    console.log(origins);
    console.log(destinations);
    const client = new Client({});

    //todo: change transit_mode for trams
    const data = await client.distancematrix({
      params: {
        key: api_key,
        origins: origins,
        destinations: destinations,
        mode: TravelMode.driving,
        transit_mode: [TransitMode.bus],
        units: UnitSystem.metric,
      },
    });
    return data.data.rows[0].elements.map((a) => a.duration);
  }
}
