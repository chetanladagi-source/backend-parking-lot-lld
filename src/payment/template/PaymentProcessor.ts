export abstract class PaymentProcessor {
  public process(amount: number): void {
    this.validate(amount);

    this.calculateCharges(amount);

    this.processPayment(amount);

    this.generateReceipt(amount);

    this.notifyCustomer();
  }

  protected validate(amount: number): void {
    console.log("Validating payment...");
  }

  protected calculateCharges(amount: number): void {
    console.log("Calculating charges...");
  }

  protected abstract processPayment(amount: number): void;

  protected generateReceipt(amount: number): void {
    console.log("Generating receipt...");
  }

  protected notifyCustomer(): void {
    console.log("Sending notification...");
  }
}
