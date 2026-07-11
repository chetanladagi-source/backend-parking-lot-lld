import { ParkingOperations } from "../services/ParkingOperations";
import { ParkingTicket } from "../models/ParkingTicket";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { Expression } from "../interpreter/Expression";
import { ParkingVisitor } from "../visitor/ParkingVisitor";

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

  public printAvailableSlots(): void {
    this.parkingService.printAvailableSlots();
  }

  public printExpressionSlots(expression: Expression): void {
    this.parkingService.printExpressionSlots(expression);
  }

  public printRevenueReport(visitor: ParkingVisitor): void {
    this.parkingService.printRevenueReport(visitor);
  }
}
