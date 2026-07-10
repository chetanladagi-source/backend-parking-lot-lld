import { Command } from "./Command";
import { ParkingService } from "../services/ParkingService";
import { Vehicle } from "../modles/Vehicle";

export class ParkVehicleCommand implements Command {
  constructor(
    private parkingService: ParkingService,
    private vehicle: Vehicle,
  ) {}

  execute(): void {
    this.parkingService.parkVehicle(this.vehicle);
  }
}
