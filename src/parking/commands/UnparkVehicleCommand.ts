import { Command } from "./Command";

import { ParkingOperations } from "../services/ParkingOperations";
import { ParkingTicket } from "../models/ParkingTicket";

export class UnparkVehicleCommand implements Command<ParkingTicket> {
  constructor(
    private readonly parkingOperations: ParkingOperations,
    private readonly ticket: ParkingTicket,
  ) {}

  public execute(): ParkingTicket {
    return this.parkingOperations.unparkVehicle(this.ticket);
  }
}
