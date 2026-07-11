import { ParkingSlot } from "../models/ParkingSlot";

export interface ParkingVisitor {
  visitParkingSlot(slot: ParkingSlot): void;
}
