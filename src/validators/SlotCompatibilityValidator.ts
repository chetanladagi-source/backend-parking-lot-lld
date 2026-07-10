import { ParkingLot } from "../modles/ParkingLot";
import { Vehicle } from "../modles/Vehicle";
import { ParkingValidator } from "./ParkingValidator";

export class SlotCompatibilityValidator extends ParkingValidator {
  protected doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    console.log("✓ Slot Compatible");
  }
}
