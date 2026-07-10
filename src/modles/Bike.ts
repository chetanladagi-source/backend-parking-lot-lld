import { Vehicle } from "./Vehicle";
import { VehicleType } from "../enums/VehicleType";

export class Bike extends Vehicle {

  getType(): VehicleType {
    return VehicleType.BIKE;
  }

}