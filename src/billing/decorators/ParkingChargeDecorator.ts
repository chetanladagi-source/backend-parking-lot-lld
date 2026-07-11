import { ParkingCharge } from "../models/ParkingCharge";

export abstract class ParkingChargeDecorator implements ParkingCharge {
  constructor(protected readonly charge: ParkingCharge) {}

  public abstract getAmount(): number;

  public abstract getDescription(): string;
}
