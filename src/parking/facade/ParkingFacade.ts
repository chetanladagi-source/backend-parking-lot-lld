import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkVehicleCommand } from "../commands/ParkVehicleCommand";
import { UnparkVehicleCommand } from "../commands/UnparkVehicleCommand";
import { ParkingCaretaker } from "../memento/ParkingCaretaker";

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

  public undoLastOperation(): void {
    //TO-DO: this should be at constrctor
    const caretaker = new ParkingCaretaker();
    const snapshot = caretaker.undo();

    if (!snapshot) {
      console.log("Nothing to Undo");

      return;
    }

    const ticket = snapshot.getTicket();

    console.log(
      "Undo Ticket :",

      ticket.getTicketId(),
    );
  }
}
