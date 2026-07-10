import { ParkingService } from "../services/ParkingService";
import { ParkVehicleCommand } from "../commands/ParkVehicleCommand";
import { Vehicle } from "../modles/Vehicle";
import { ParkingTicket } from "../modles/ParkingTicket";
import { UnparkVehicleCommand } from "../commands/UnparkVehicleCommand";

export class ParkingFacade {
  constructor(private readonly parkingService: ParkingService) {}

  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    const command = new ParkVehicleCommand(this.parkingService, vehicle);

    return command.execute();
  }

  public unparkVehicle(ticket: ParkingTicket): ParkingTicket {
    const command = new UnparkVehicleCommand(this.parkingService, ticket);

    return command.execute();
  }
}
