import { ParkingLotBuilder } from "../parking/builders/ParkingLotBuilder";
import { ParkingFacade } from "../parking/facade/ParkingFacade";
import { Analytics } from "../parking/observers/Analytics";
import { DisplayBoard } from "../parking/observers/DisplayBoard";
import { Logger } from "../parking/observers/Logger";
import { ParkingProxy } from "../parking/proxy/ParkingProxy";
import { ParkingService } from "../parking/services/ParkingService";
import { FirstAvailableStrategy } from "../parking/strategies/FirstAvailableStrategy";
import { ParkingLotOpenValidator } from "../parking/validators/ParkingLotOpenValidator";
import { SlotCompatibilityValidator } from "../parking/validators/SlotCompatibilityValidator";
import { VehicleTypeValidator } from "../parking/validators/VehicleTypeValidator";

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

    const proxy = new ParkingProxy(parkingService);

    return new ParkingFacade(proxy);
  }
}
