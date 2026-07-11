import { ParkingSlot } from "../models/ParkingSlot";
import { Observer } from "./Observer";

export class Analytics implements Observer {

    update(slot: ParkingSlot): void {

        console.log(
            `Analytics Updated`
        );

    }

}