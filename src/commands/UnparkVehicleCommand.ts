import { Command } from "./Command";

import { ParkingService } from "../services/ParkingService";
import { ParkingTicket } from "../modles/ParkingTicket";

export class UnparkVehicleCommand implements Command<ParkingTicket> {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly ticket: ParkingTicket,
  ) {}

  public execute(): ParkingTicket {
    return this.parkingService.unparkVehicle(this.ticket);
  }
}
