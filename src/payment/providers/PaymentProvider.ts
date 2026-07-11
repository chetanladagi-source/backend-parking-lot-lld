export interface PaymentProvider {
  pay(amount: number): void;
}
