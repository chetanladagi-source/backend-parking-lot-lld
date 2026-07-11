import { VehicleType } from "../../shared/enums/VehicleType";
import { Bike } from "../models/Bike";
import { Car } from "../models/Car";
import { Truck } from "../models/Truck";
import { Vehicle } from "../models/Vehicle";

export class VehicleFactory {

  public static createVehicle(
    type: VehicleType,
    registrationNumber: string,
    color: string
  ): Vehicle {

    switch (type) {

      case VehicleType.CAR:
        return new Car(registrationNumber, color);

      case VehicleType.BIKE:
        return new Bike(registrationNumber, color);

      case VehicleType.TRUCK:
        return new Truck(registrationNumber, color);

      default:
        throw new Error("Unsupported vehicle type");
    }
  }

}