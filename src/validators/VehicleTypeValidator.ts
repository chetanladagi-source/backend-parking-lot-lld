import { ParkingLot } from "../modles/ParkingLot";
import { Vehicle } from "../modles/Vehicle";
import { ParkingValidator } from "./ParkingValidator";

export class VehicleTypeValidator extends ParkingValidator {
  protected doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    console.log("✓ Vehicle Type Validated");
  }
}
