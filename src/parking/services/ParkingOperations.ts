import { ParkingTicket } from "../models/ParkingTicket";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { Expression } from "../interpreter/Expression";
import { ParkingVisitor } from "../visitor/ParkingVisitor";

export interface ParkingOperations {
  parkVehicle(vehicle: Vehicle): ParkingTicket;

  unparkVehicle(ticket: ParkingTicket): ParkingTicket;

  printAvailableSlots(): void;

  printExpressionSlots(expression: Expression): void;

  printRevenueReport(visitor: ParkingVisitor): void;
}
