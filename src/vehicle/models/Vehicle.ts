import { VehicleType } from "../../shared/enums/VehicleType";

export abstract class Vehicle {
  constructor(
    private readonly registrationNumber: string,
    private readonly color: string,
  ) {}

  abstract getType(): VehicleType;

  public getRegistrationNumber(): string {
    return this.registrationNumber;
  }

  public getColor(): string {
    return this.color;
  }

  public displayInfo(): void {
    console.log("Vehicle Information");
    console.log("-------------------");
    console.log(`Registration : ${this.registrationNumber}`);
    console.log(`Type         : ${this.getType()}`);
    console.log(`Color        : ${this.color}`);
  }
}
