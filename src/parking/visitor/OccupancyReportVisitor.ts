import { ParkingVisitor } from "./ParkingVisitor";

import { ParkingSlot } from "../models/ParkingSlot";

export class OccupancyReportVisitor implements ParkingVisitor {
  public visitParkingSlot(slot: ParkingSlot): void {
    console.log(
      `${slot.getSlotNumber()} : ${
        slot.isAvailable() ? "Available" : "Occupied"
      }`,
    );
  }
}
