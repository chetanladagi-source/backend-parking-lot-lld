import { ParkVehicleCommand } from "../commands/ParkVehicleCommand";
import { Vehicle } from "../modles/Vehicle";
import { ParkingService } from "../services/ParkingService";

export class ParkingFacade {
  constructor(private parkingService: ParkingService) {}

  public parkVehicle(vehicle: Vehicle) {
    const command = new ParkVehicleCommand(this.parkingService, vehicle);

    command.execute();
  }
}
