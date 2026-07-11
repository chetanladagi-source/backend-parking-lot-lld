import { Observer } from "./Observer";
import { ParkingSlot } from "../models/ParkingSlot";

export class DisplayBoard implements Observer {
  update(slot: ParkingSlot): void {
    console.log(`Display Updated : Slot ${slot.getSlotNumber()} occupied`);
  }
}
