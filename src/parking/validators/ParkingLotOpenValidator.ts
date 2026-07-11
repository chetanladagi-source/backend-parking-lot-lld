import { ParkingLot } from "../models/ParkingLot";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkingValidator } from "./ParkingValidator";

export class ParkingLotOpenValidator extends ParkingValidator {
  protected doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    console.log("✓ Parking Lot Open");
  }
}
