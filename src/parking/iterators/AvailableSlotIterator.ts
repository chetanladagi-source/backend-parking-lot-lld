import { ParkingIterator } from "./ParkingIterator";

import { ParkingLot } from "../models/ParkingLot";
import { ParkingSlot } from "../models/ParkingSlot";

export class AvailableSlotIterator implements ParkingIterator {
  private readonly slots: ParkingSlot[] = [];

  private index = 0;

  constructor(parkingLot: ParkingLot) {
    for (const floor of parkingLot.getAllFloors()) {
      for (const slot of floor.getAllSlots()) {
        if (slot.isAvailable()) {
          this.slots.push(slot);
        }
      }
    }
  }

  public hasNext(): boolean {
    return this.index < this.slots.length;
  }

  public next(): ParkingSlot {
    return this.slots[this.index++];
  }
}
