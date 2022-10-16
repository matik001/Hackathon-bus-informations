import { VehicleEnum } from '../dto/bus-location.dto';

export type VehicleType = {
  name: string;
  type: VehicleEnum;
  y: number;
  x: number;
  k: number;
};
