import { PaymentProvider } from "../providers/PaymentProvider";

export abstract class Payment {
  constructor(protected readonly provider: PaymentProvider) {}

  public abstract processPayment(amount: number): void;
}
