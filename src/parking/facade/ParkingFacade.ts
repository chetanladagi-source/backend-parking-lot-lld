import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkVehicleCommand } from "../commands/ParkVehicleCommand";
import { UnparkVehicleCommand } from "../commands/UnparkVehicleCommand";

import { ParkingTicket } from "../models/ParkingTicket";

import { ParkingOperations } from "../services/ParkingOperations";

export class ParkingFacade {
  constructor(private readonly parkingOperations: ParkingOperations) {}

  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    const command = new ParkVehicleCommand(this.parkingOperations, vehicle);

    return command.execute();
  }

  public unparkVehicle(ticket: ParkingTicket): ParkingTicket {
    const command = new UnparkVehicleCommand(this.parkingOperations, ticket);

    return command.execute();
  }
}
