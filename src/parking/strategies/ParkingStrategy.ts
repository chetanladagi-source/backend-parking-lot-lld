import { ParkingLot } from "../models/ParkingLot";
import { ParkingSlot } from "../models/ParkingSlot";
import { Vehicle } from "../../vehicle/models/Vehicle";

export interface ParkingStrategy {
  findAvailableSlot(
    parkingLot: ParkingLot,
    vehicle: Vehicle,
  ): ParkingSlot | null;
}
