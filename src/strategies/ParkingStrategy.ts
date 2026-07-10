import { ParkingLot } from "../modles/ParkingLot";
import { ParkingSlot } from "../modles/ParkingSlot";
import { Vehicle } from "../modles/Vehicle";

export interface ParkingStrategy {
  findAvailableSlot(
    parkingLot: ParkingLot,
    vehicle: Vehicle,
  ): ParkingSlot | null;
}
