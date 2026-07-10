import { Vehicle } from "./Vehicle";
import { VehicleType } from "../enums/VehicleType";

export class Car extends Vehicle {
  getType(): VehicleType {
    return VehicleType.CAR;
  }
}
