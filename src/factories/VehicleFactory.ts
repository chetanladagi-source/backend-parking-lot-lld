import { VehicleType } from "../enums/VehicleType";
import { Bike } from "../modles/Bike";
import { Car } from "../modles/Car";
import { Truck } from "../modles/Truck";
import { Vehicle } from "../modles/Vehicle";

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