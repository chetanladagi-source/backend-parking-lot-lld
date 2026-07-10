import { ParkingSlot } from "../modles/ParkingSlot";
import { Vehicle } from "../modles/Vehicle";

export interface ParkingSlotState {
  park(slot: ParkingSlot, vehicle: Vehicle): void;

  unpark(slot: ParkingSlot): void;
}
