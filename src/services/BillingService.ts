import { BaseParkingCharge } from "../billing/BaseParkingCharge";
import { DecoratorFactory } from "../billing/DecoratorFactory";
import { ParkingCharge } from "../billing/ParkingCharge";

import { AdditionalService } from "../enums/AdditionalService";
import { ParkingTicket } from "../modles/ParkingTicket";

export class BillingService {
  private readonly decoratorFactory = new DecoratorFactory();

  public calculate(
    ticket: ParkingTicket,
    services: AdditionalService[],
  ): ParkingCharge {
    const baseCharge = new BaseParkingCharge(ticket);

    return this.decoratorFactory.decorate(baseCharge, services);
  }
}
