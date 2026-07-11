import { PaymentProvider } from "./PaymentProvider";

export class RazorpayProvider implements PaymentProvider {
  public pay(amount: number): void {
    console.log(`Paid ₹${amount} using Razorpay`);
  }
}
