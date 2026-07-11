import { Command } from "./Command";
import { ParkingOperations } from "../services/ParkingOperations";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkingTicket } from "../models/ParkingTicket";

export class ParkVehicleCommand implements Command<ParkingTicket> {
  constructor(
    private readonly parkingOperations: ParkingOperations,
    private readonly vehicle: Vehicle,
  ) {}

  public execute(): ParkingTicket {
    return this.parkingOperations.parkVehicle(this.vehicle);
  }
}
