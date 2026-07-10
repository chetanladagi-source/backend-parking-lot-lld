import { ParkingLot } from "../modles/ParkingLot";
import { ParkingSlot } from "../modles/ParkingSlot";
import { Vehicle } from "../modles/Vehicle";
import { Observer } from "../observers/Observer";
import { ParkingStrategy } from "../strategies/ParkingStrategy";
import { ParkingValidator } from "../validators/ParkingValidator";

export class ParkingService {
  constructor(
    private parkingLot: ParkingLot,
    private parkingStrategy: ParkingStrategy,
    private validator: ParkingValidator,
  ) {}

  private observers: Observer[] = [];
  public parkVehicle(vehicle: Vehicle): ParkingSlot {
    this.validator.validate(vehicle, this.parkingLot);
    const slot = this.parkingStrategy.findAvailableSlot(
      this.parkingLot,
      vehicle,
    );

    if (!slot) {
      throw new Error("Parking Lot Full");
    }

    slot.parkVehicle(vehicle);

    this.notifyObservers(slot);

    return slot;
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  private notifyObservers(slot: ParkingSlot): void {
    for (const observer of this.observers) {
      observer.update(slot);
    }
  }
}
