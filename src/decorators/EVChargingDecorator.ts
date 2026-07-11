import { ParkingChargeDecorator } from "./ParkingChargeDecorator";

export class EVChargingDecorator extends ParkingChargeDecorator {
  public getAmount(): number {
    return this.charge.getAmount() + 300;
  }

  public getDescription(): string {
    return this.charge.getDescription() + " + EV Charging";
  }
}
