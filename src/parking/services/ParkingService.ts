import { randomUUID } from "crypto";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingSlot } from "../models/ParkingSlot";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { Observer } from "../observers/Observer";
import { ParkingStrategy } from "../strategies/ParkingStrategy";
import { ParkingValidator } from "../validators/ParkingValidator";
import { ParkingTicket } from "../models/ParkingTicket";
import { ParkingOperations } from "./ParkingOperations";
import { ParkingMediator } from "../mediators/ParkingMediator";
import { ParkingEvent } from "../../shared/enums/ParkingEvent";
import { ParkingCaretaker } from "../memento/ParkingCaretaker";
import { ParkingMemento } from "../memento/ParkingMemento";
import { Expression } from "../interpreter/Expression";
import { ParkingVisitor } from "../visitor/ParkingVisitor";

export class ParkingService implements ParkingOperations {
  constructor(
    private readonly parkingLot: ParkingLot,
    private readonly parkingStrategy: ParkingStrategy,
    private readonly validator: ParkingValidator,
    private readonly mediator: ParkingMediator,
    private readonly caretaker: ParkingCaretaker,
  ) {}

  private observers: Observer[] = [];
  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    this.validator.validate(vehicle, this.parkingLot);
    const slot = this.parkingStrategy.findAvailableSlot(
      this.parkingLot,
      vehicle,
    );

    if (!slot) {
      throw new Error("Parking Lot Full");
    }

    slot.parkVehicle(vehicle);

    this.notifyObservers(slot);

    const ticket = new ParkingTicket(randomUUID(), vehicle, slot);
    // this.mediator.notify(this, ParkingEvent.VEHICLE_PARKED, ticket);
    // this.caretaker.save(new ParkingMemento(ticket));
    return ticket;
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  private notifyObservers(slot: ParkingSlot): void {
    for (const observer of this.observers) {
      observer.update(slot);
    }
  }

  public printAvailableSlots(): void {
    const iterator = this.parkingLot.createAvailableSlotIterator();

    console.log("========== Available Slots ==========");

    while (iterator.hasNext()) {
      const slot = iterator.next();

      console.log(`${slot.getSlotNumber()} (${slot.getSlotType()})`);
    }

    console.log("=====================================");
  }

  public printExpressionSlots(expression: Expression): void {
    console.log("========== Available Slot for vehicle type  ==========");

    for (const floor of this.parkingLot.getAllFloors()) {
      for (const slot of floor.getAllSlots()) {
        if (expression.interpret(slot)) {
          console.log(slot.getSlotNumber());
        }
      }
    }

    console.log("=====================================");
  }

  public printRevenueReport(visitor: ParkingVisitor): void {
    console.log("========== Revenue Reports ==========");

    for (const floor of this.parkingLot.getAllFloors()) {
      for (const slot of floor.getAllSlots()) {
        slot.accept(visitor);
      }
    }

    console.log("=====================================");
  }

  public unparkVehicle(ticket: ParkingTicket): ParkingTicket {
    ticket.closeTicket();

    const slot = ticket.getParkingSlot();

    slot.unparkVehicle();

    this.notifyObservers(slot);

    // this.mediator.notify(this, ParkingEvent.VEHICLE_EXITED, ticket);

    return ticket;
  }
}
