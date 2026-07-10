import { ParkingLot } from "../modles/ParkingLot";
import { Vehicle } from "../modles/Vehicle";
import { ParkingValidator } from "./ParkingValidator";

export class ParkingLotOpenValidator extends ParkingValidator {
  protected doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    console.log("✓ Parking Lot Open");
  }
}
