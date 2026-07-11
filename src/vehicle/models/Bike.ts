import { Vehicle } from "./Vehicle";
import { VehicleType } from "../../shared/enums/VehicleType";

export class Bike extends Vehicle {

  getType(): VehicleType {
    return VehicleType.BIKE;
  }

}