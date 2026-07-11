import { ParkingLot } from "../models/ParkingLot";

export interface IParkingLotBuilder {
  buildName(): void;

  buildFloors(): void;

  buildSlots(): void;

  buildSecurity(): void;

  buildDisplayBoard(): void;

  getResult(): ParkingLot;
}
