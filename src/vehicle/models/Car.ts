import { Vehicle } from "./Vehicle";
import { VehicleType } from "../../shared/enums/VehicleType";

export class Car extends Vehicle {
  getType(): VehicleType {
    return VehicleType.CAR;
  }
}
