import { ParkingLot } from "../modles/ParkingLot";
import { ParkingSlot } from "../modles/ParkingSlot";
import { Vehicle } from "../modles/Vehicle";
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