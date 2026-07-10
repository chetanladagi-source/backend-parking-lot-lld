import { Observer } from "./Observer";
import { ParkingSlot } from "../modles/ParkingSlot";

export class Logger implements Observer {
  update(slot: ParkingSlot): void {
    console.log(`Log : Vehicle parked at ${slot.getSlotNumber()}`);
  }
}
