import { ParkingSlot } from "../models/ParkingSlot";
import { Vehicle } from "../../vehicle/models/Vehicle";

export interface ParkingSlotState {
  park(slot: ParkingSlot, vehicle: Vehicle): void;

  unpark(slot: ParkingSlot): void;
}
