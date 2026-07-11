import { ParkingSlotType } from "../../shared/enums/ParkingSlotType";

import { ParkingSlot } from "../models/ParkingSlot";

import { Expression } from "./Expression";

export class TypeExpression implements Expression {
  constructor(private readonly slotType: ParkingSlotType) {}

  public interpret(slot: ParkingSlot): boolean {
    return slot.getSlotType() === this.slotType;
  }
}
