import { PaymentProcessor } from "./PaymentProcessor";

export class RazorpayPaymentProcessor extends PaymentProcessor {
  protected processPayment(amount: number): void {
    console.log(`Processing ₹${amount} using Razorpay`);
  }
}
