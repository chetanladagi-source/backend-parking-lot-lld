import { ParkingCharge } from "../billing/ParkingCharge";

export abstract class ParkingChargeDecorator implements ParkingCharge {
  constructor(protected readonly charge: ParkingCharge) {}

  public abstract getAmount(): number;

  public abstract getDescription(): string;
}
