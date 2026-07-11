import { PaymentProvider } from "./PaymentProvider";

export class StripeProvider implements PaymentProvider {
  public pay(amount: number): void {
    console.log(`Paid ₹${amount} using Stripe`);
  }
}
