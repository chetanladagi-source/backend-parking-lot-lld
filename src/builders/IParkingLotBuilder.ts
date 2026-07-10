import { ParkingLot } from "../modles/ParkingLot";

export interface IParkingLotBuilder {
  buildName(): void;

  buildFloors(): void;

  buildSlots(): void;

  buildSecurity(): void;

  buildDisplayBoard(): void;

  getResult(): ParkingLot;
}
