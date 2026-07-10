import { ParkingSlot } from "../modles/ParkingSlot";
import { AvailableState } from "./AvailableState";
import { ParkingSlotState } from "./ParkingSlotState";

export class OccupiedState
implements ParkingSlotState {

    park(): void {

        throw new Error(
            "Already Occupied"
        );

    }

    unpark(
        slot: ParkingSlot
    ): void {

        slot.setVehicle(null);

        slot.setState(
            new AvailableState()
        );

        console.log("Vehicle Removed");

    }

}