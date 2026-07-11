import { Command } from "./Command";
import { ParkingService } from "../services/ParkingService";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkingTicket } from "../models/ParkingTicket";

export class ParkVehicleCommand implements Command<ParkingTicket> {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly vehicle: Vehicle,
  ) {}

  public execute(): ParkingTicket {
    return this.parkingService.parkVehicle(this.vehicle);
  }
}
