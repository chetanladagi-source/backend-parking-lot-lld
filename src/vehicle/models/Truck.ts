import { Vehicle } from "./Vehicle";
import { VehicleType } from "../../shared/enums/VehicleType";

export class Truck extends Vehicle {
  getType(): VehicleType {
    return VehicleType.TRUCK;
  }
}
