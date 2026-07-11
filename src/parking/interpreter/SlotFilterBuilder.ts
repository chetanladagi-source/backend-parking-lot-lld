import { ParkingSlotType } from "../../shared/enums/ParkingSlotType";

import { Expression } from "./Expression";
import { AndExpression } from "./AndExpression";
import { TypeExpression } from "./TypeExpression";
import { AvailabilityExpression } from "./AvailabilityExpression";

/**
 * Builder that assembles an Interpreter/Composite expression tree via a fluent
 * API. Each chained condition is combined with AND. This decouples callers from
 * the concrete Expression classes and how they are nested.
 */
export class SlotFilterBuilder {
  private readonly conditions: Expression[] = [];

  public static create(): SlotFilterBuilder {
    return new SlotFilterBuilder();
  }

  public ofType(slotType: ParkingSlotType): this {
    this.conditions.push(new TypeExpression(slotType));

    return this;
  }

  public available(isAvailable = true): this {
    this.conditions.push(new AvailabilityExpression(isAvailable));

    return this;
  }

  public build(): Expression {
    if (this.conditions.length === 0) {
      throw new Error("SlotFilterBuilder requires at least one condition");
    }

    return this.conditions.reduce(
      (combined, condition) => new AndExpression(combined, condition),
    );
  }
}
