import { ParkingSlot } from "../modles/ParkingSlot";
import { Vehicle } from "../modles/Vehicle";
import { OccupiedState } from "./OccupiedState";
import { ParkingSlotState } from "./ParkingSlotState";

export class AvailableState implements ParkingSlotState {
  park(slot: ParkingSlot, vehicle: Vehicle): void {
    slot.setVehicle(vehicle);

    slot.setState(new OccupiedState());

    console.log("Vehicle Parked");
  }

  unpark(): void {
    throw new Error("Slot already empty.");
  }
}
