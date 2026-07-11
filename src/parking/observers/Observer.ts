import { ParkingSlot } from "../models/ParkingSlot";

export interface Observer {

    update(slot: ParkingSlot): void;

}