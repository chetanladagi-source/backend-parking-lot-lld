import { ParkingLot } from "../models/ParkingLot";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkingValidator } from "./ParkingValidator";

export class VehicleTypeValidator extends ParkingValidator {
  protected doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    console.log("✓ Vehicle Type Validated");
  }
}
