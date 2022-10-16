import { VehicleType } from '../types/vehicle-info.type';

export interface MpkInterface {
  getStops(): Promise<Array<string>>;
  getBusesForStop(stop_name: string): Promise<Array<string>>;
  getBusesLocationForStop(stop_name: string): Promise<Array<VehicleType>>;
}
