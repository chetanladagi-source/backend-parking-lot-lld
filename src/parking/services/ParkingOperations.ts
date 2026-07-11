import { ParkingTicket } from "../models/ParkingTicket";
import { Vehicle } from "../../vehicle/models/Vehicle";

export interface ParkingOperations {
  parkVehicle(vehicle: Vehicle): ParkingTicket;

  unparkVehicle(ticket: ParkingTicket): ParkingTicket;
}
