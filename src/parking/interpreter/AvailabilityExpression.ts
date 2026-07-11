import { ParkingSlot } from "../models/ParkingSlot";

import { Expression } from "./Expression";

export class AvailabilityExpression implements Expression {
  constructor(private readonly available: boolean) {}

  public interpret(slot: ParkingSlot): boolean {
    return slot.isAvailable() === this.available;
  }
}
