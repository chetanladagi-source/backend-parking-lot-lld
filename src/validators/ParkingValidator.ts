import { ParkingLot } from "../modles/ParkingLot";
import { Vehicle } from "../modles/Vehicle";

export abstract class ParkingValidator {
  private nextValidator?: ParkingValidator;

  public setNext(validator: ParkingValidator): ParkingValidator {
    this.nextValidator = validator;

    return validator;
  }

  public validate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    this.doValidate(vehicle, parkingLot);

    if (this.nextValidator) {
      this.nextValidator.validate(vehicle, parkingLot);
    }
  }

  protected abstract doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void;
}
