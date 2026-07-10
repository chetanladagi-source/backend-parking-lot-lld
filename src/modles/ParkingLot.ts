import { ParkingFloor } from "./ParkingFloor";

export class ParkingLot {
  private static instance: ParkingLot;

  private parkingFloors: ParkingFloor[] = [];

  private constructor(private readonly name: string) {}

  public static getInstance(name: string): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot(name);
    }

    return ParkingLot.instance;
  }

  public addFloor(floor: ParkingFloor): void {
    this.parkingFloors.push(floor);
  }

  public removeFloor(floorNumber: number): void {
    this.parkingFloors = this.parkingFloors.filter(
      (floor) => floor.getFloorNumber() !== floorNumber,
    );
  }

  public getFloor(floorNumber: number): ParkingFloor | undefined {
    return this.parkingFloors.find(
      (floor) => floor.getFloorNumber() === floorNumber,
    );
  }

  public getAllFloors(): ParkingFloor[] {
    return this.parkingFloors;
  }

  public getName(): string {
    return this.name;
  }
}
