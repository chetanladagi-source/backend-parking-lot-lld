import { ParkingOperations } from "../services/ParkingOperations";
import { ParkingTicket } from "../models/ParkingTicket";
import { Vehicle } from "../../vehicle/models/Vehicle";

export class ParkingProxy implements ParkingOperations {
  constructor(private readonly parkingService: ParkingOperations) {}

  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    console.log("Checking Gate Security...");

    console.log("Checking Blacklist...");

    console.log("Checking Monthly Pass...");

    return this.parkingService.parkVehicle(vehicle);
  }

  public unparkVehicle(ticket: ParkingTicket): ParkingTicket {
    console.log("Opening Exit Gate...");

    return this.parkingService.unparkVehicle(ticket);
  }
}
