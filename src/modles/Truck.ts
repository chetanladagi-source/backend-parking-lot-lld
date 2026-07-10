import { Vehicle } from "./Vehicle";
import { VehicleType } from "../enums/VehicleType";

export class Truck extends Vehicle {
  getType(): VehicleType {
    return VehicleType.TRUCK;
  }
}
