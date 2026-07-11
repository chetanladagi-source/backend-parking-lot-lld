import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkVehicleCommand } from "../commands/ParkVehicleCommand";
import { UnparkVehicleCommand } from "../commands/UnparkVehicleCommand";
import { ParkingCaretaker } from "../memento/ParkingCaretaker";

import { ParkingTicket } from "../models/ParkingTicket";

import { ParkingOperations } from "../services/ParkingOperations";
import { Expression } from "../interpreter/Expression";
import { ParkingVisitor } from "../visitor/ParkingVisitor";

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

  public printAvailableSlot(): void {
    this.parkingOperations.printAvailableSlots();
  }

  public printExpressionSlots(expression: Expression): void {
    this.parkingOperations.printExpressionSlots(expression);
  }

  public printRevenueReport(visitor: ParkingVisitor): void {
    this.parkingOperations.printRevenueReport(visitor);
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
