import { ParkingVisitor } from "./ParkingVisitor";

import { ParkingSlot } from "../models/ParkingSlot";

export class RevenueReportVisitor implements ParkingVisitor {
  public visitParkingSlot(slot: ParkingSlot): void {
    console.log(`Revenue Report : ${slot.getSlotNumber()}`);
  }
}
