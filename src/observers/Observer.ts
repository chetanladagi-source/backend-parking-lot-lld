import { ParkingSlot } from "../modles/ParkingSlot";

export interface Observer {

    update(slot: ParkingSlot): void;

}