import { ParkingSlot } from "../models/ParkingSlot";

export interface Expression {
  interpret(slot: ParkingSlot): boolean;
}
