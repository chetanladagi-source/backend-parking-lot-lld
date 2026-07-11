import { ParkingLot } from "../models/ParkingLot";
import { ParkingSlot } from "../models/ParkingSlot";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkingStrategy } from "./ParkingStrategy";

export class FirstAvailableStrategy
    implements ParkingStrategy {

    public findAvailableSlot(
        parkingLot: ParkingLot,
        vehicle: Vehicle
    ): ParkingSlot | null {

        for (const floor of parkingLot.getAllFloors()) {

            const slot = floor.getAvailableSlot();

            if (slot) {
                return slot;
            }

        }

        return null;

    }

}