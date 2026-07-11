import { ParkingSlot } from "../models/ParkingSlot";

import { Expression } from "./Expression";

export class AndExpression implements Expression {
  constructor(
    private readonly left: Expression,
    private readonly right: Expression,
  ) {}

  public interpret(slot: ParkingSlot): boolean {
    return this.left.interpret(slot) && this.right.interpret(slot);
  }
}
