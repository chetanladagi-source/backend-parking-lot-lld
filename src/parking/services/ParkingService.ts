import { randomUUID } from "crypto";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingSlot } from "../models/ParkingSlot";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { Observer } from "../observers/Observer";
import { ParkingStrategy } from "../strategies/ParkingStrategy";
import { ParkingValidator } from "../validators/ParkingValidator";
import { ParkingTicket } from "../models/ParkingTicket";
import { ParkingOperations } from "./ParkingOperations";

export class ParkingService implements ParkingOperations {
  constructor(
    private readonly parkingLot: ParkingLot,
    private readonly parkingStrategy: ParkingStrategy,
    private readonly validator: ParkingValidator,
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

    return new ParkingTicket(randomUUID(), vehicle, slot);
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  private notifyObservers(slot: ParkingSlot): void {
    for (const observer of this.observers) {
      observer.update(slot);
    }
  }

  public unparkVehicle(ticket: ParkingTicket): ParkingTicket {
    ticket.closeTicket();

    const slot = ticket.getParkingSlot();

    slot.unparkVehicle();

    this.notifyObservers(slot);

    return ticket;
  }
}
