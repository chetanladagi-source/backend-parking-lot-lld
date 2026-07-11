import { ParkingSlot } from "../models/ParkingSlot";

export interface ParkingIterator {
  hasNext(): boolean;

  next(): ParkingSlot;
}
