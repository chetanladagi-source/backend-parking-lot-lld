import { ParkingSlotType } from "../enums/ParkingSlotType";
import { ParkingFloor } from "../modles/ParkingFloor";
import { ParkingLot } from "../modles/ParkingLot";
import { ParkingSlot } from "../modles/ParkingSlot";

export class ParkingLotBuilder {
  private parkingLot: ParkingLot;

  private currentFloor: ParkingFloor | null = null;

  private currentFloorNumber = 0;

  constructor(name: string) {
    this.parkingLot = ParkingLot.getInstance(name);
  }

  public addFloor(floorNumber: number): ParkingLotBuilder {
    const floor = new ParkingFloor(floorNumber);

    this.parkingLot.addFloor(floor);

    this.currentFloor = floor;
    this.currentFloorNumber = floorNumber;

    return this;
  }

  public addCarSlots(count: number): ParkingLotBuilder {
    this.ensureFloorExists();

    this.addSlots(ParkingSlotType.CAR, count, "C");

    return this;
  }

  public addBikeSlots(count: number): ParkingLotBuilder {
    this.ensureFloorExists();

    this.addSlots(ParkingSlotType.BIKE, count, "B");

    return this;
  }

  public addTruckSlots(count: number): ParkingLotBuilder {
    this.ensureFloorExists();

    this.addSlots(ParkingSlotType.TRUCK, count, "T");

    return this;
  }

  private addSlots(
    slotType: ParkingSlotType,
    count: number,
    prefix: string,
  ): void {
    for (let i = 1; i <= count; i++) {
      this.currentFloor!.addSlot(
        new ParkingSlot(`F${this.currentFloorNumber}-${prefix}${i}`, slotType),
      );
    }
  }

  private ensureFloorExists(): void {
    if (!this.currentFloor) {
      throw new Error("Please call addFloor() before adding slots.");
    }
  }

  public build(): ParkingLot {
    return this.parkingLot;
  }
}
