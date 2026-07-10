import { ParkingLotBuilder } from "../builders/ParkingLotBuilder";
import { ParkingFacade } from "../facades/ParkingFacade";
import { Analytics } from "../observers/Analytics";
import { DisplayBoard } from "../observers/DisplayBoard";
import { Logger } from "../observers/Logger";
import { ParkingService } from "../services/ParkingService";
import { FirstAvailableStrategy } from "../strategies/FirstAvailableStrategy";
import { ParkingLotOpenValidator } from "../validators/ParkingLotOpenValidator";
import { SlotCompatibilityValidator } from "../validators/SlotCompatibilityValidator";
import { VehicleTypeValidator } from "../validators/VehicleTypeValidator";

export class Application {
  public static createParkingFacade(): ParkingFacade {
    const parkingLot = new ParkingLotBuilder("Forum Mall")
      .addFloor(1)
      .addCarSlots(10)
      .addBikeSlots(5)
      .addTruckSlots(2)

      .addFloor(2)
      .addCarSlots(20)
      .addBikeSlots(10)
      .addTruckSlots(5)

      .build();

    const strategy = new FirstAvailableStrategy();

    const validator = new VehicleTypeValidator();

    validator
      .setNext(new ParkingLotOpenValidator())
      .setNext(new SlotCompatibilityValidator());

    const parkingService = new ParkingService(parkingLot, strategy, validator);

    parkingService.addObserver(new DisplayBoard());

    parkingService.addObserver(new Logger());

    parkingService.addObserver(new Analytics());

    return new ParkingFacade(parkingService);
  }
}
