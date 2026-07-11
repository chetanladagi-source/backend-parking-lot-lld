import { ParkingChargeDecorator } from "./ParkingChargeDecorator";

export class PremiumParkingDecorator extends ParkingChargeDecorator {
  public getAmount(): number {
    return this.charge.getAmount() + 100;
  }

  public getDescription(): string {
    return this.charge.getDescription() + " + Premium Parking";
  }
}
