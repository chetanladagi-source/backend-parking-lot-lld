import { Payment } from "./Payment";

export class OnlinePayment extends Payment {
  public processPayment(amount: number): void {
    console.log("Processing Online Payment...");

    this.provider.pay(amount);
  }
}
