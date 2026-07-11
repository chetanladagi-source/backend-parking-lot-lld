import { ParkingChargeDecorator } from "./ParkingChargeDecorator";

export class CarWashDecorator extends ParkingChargeDecorator {
  getAmount(): number {
    return this.charge.getAmount() + 200;
  }

  getDescription(): string {
    return this.charge.getDescription() + " + Car Wash";
  }
}
