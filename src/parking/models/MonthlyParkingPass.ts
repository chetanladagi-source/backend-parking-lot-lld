import { Prototype } from "../prototype/Prototype";

export class MonthlyParkingPass implements Prototype<MonthlyParkingPass> {
  constructor(
    public ownerName: string,

    public vehicleNumber: string,

    public validDays: number,

    public zone: string,
  ) {}

  public clone(): MonthlyParkingPass {
    return new MonthlyParkingPass(
      this.ownerName,

      this.vehicleNumber,

      this.validDays,

      this.zone,
    );
  }
}
