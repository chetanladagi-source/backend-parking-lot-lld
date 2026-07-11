import { ParkingSlotType } from "../../shared/enums/ParkingSlotType";
import { Vehicle } from "../../vehicle/models/Vehicle";
import { ParkingSlotState } from "../states/ParkingSlotState";
import { AvailableState } from "../states/AvailableState";
import { ParkingSlotMetadataFactory } from "../flyweight/ParkingSlotMetadataFactory";
import { ParkingVisitor } from "../visitor/ParkingVisitor";

export class ParkingSlot {
  private parkedVehicle: Vehicle | null = null;

  private state: ParkingSlotState;
  private readonly metadata;

  constructor(
    private readonly slotNumber: string,
    private readonly slotType: ParkingSlotType,
  ) {
    this.state = new AvailableState();
    this.metadata = ParkingSlotMetadataFactory.getMetadata(slotType);
  }

  public parkVehicle(vehicle: Vehicle): void {
    this.state.park(this, vehicle);
  }

  public unparkVehicle(): void {
    this.state.unpark(this);
  }

  // Methods used internally by State classes

  public setState(state: ParkingSlotState): void {
    this.state = state;
  }

  public setVehicle(vehicle: Vehicle | null): void {
    this.parkedVehicle = vehicle;
  }

  // Public getters

  public getVehicle(): Vehicle | null {
    return this.parkedVehicle;
  }

  public getSlotNumber(): string {
    return this.slotNumber;
  }

  public getSlotType(): ParkingSlotType {
    return this.slotType;
  }

  public isAvailable(): boolean {
    return this.parkedVehicle === null;
  }

  public accept(visitor: ParkingVisitor): void {
    visitor.visitParkingSlot(this);
  }
}
