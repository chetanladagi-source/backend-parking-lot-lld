import { PaymentProcessor } from "./PaymentProcessor";

export class StripePaymentProcessor extends PaymentProcessor {
  protected processPayment(amount: number): void {
    console.log(`Processing ₹${amount} using Stripe`);
  }
}
