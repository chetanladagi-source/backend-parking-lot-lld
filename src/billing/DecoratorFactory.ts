import { AdditionalService } from "../enums/AdditionalService";

import { ParkingCharge } from "./ParkingCharge";

import { CarWashDecorator } from "../decorators/CarWashDecorator";
import { PremiumParkingDecorator } from "../decorators/PremiumParkingDecorator";
import { EVChargingDecorator } from "../decorators/EVChargingDecorator";

export class DecoratorFactory {
  public decorate(
    charge: ParkingCharge,
    services: AdditionalService[],
  ): ParkingCharge {
    let decoratedCharge = charge;

    for (const service of services) {
      switch (service) {
        case AdditionalService.CAR_WASH:
          decoratedCharge = new CarWashDecorator(decoratedCharge);
          break;

        case AdditionalService.PREMIUM_PARKING:
          decoratedCharge = new PremiumParkingDecorator(decoratedCharge);
          break;

        case AdditionalService.EV_CHARGING:
          decoratedCharge = new EVChargingDecorator(decoratedCharge);
          break;
      }
    }

    return decoratedCharge;
  }
}
