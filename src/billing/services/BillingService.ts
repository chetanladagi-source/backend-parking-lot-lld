import { BaseParkingCharge } from "../models/BaseParkingCharge";
import { DecoratorFactory } from "../factories/DecoratorFactory";
import { ParkingCharge } from "../models/ParkingCharge";

import { AdditionalService } from "../../shared/enums/AdditionalService";
import { ParkingTicket } from "../../parking/models/ParkingTicket";

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
