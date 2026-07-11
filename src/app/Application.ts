import { MallParkingFactory } from "../parking/abstract-factory/MallParkingFactory";
import { ParkingLotBuilder } from "../parking/builders/ParkingLotBuilder";
import { ParkingFacade } from "../parking/facade/ParkingFacade";
import { ParkingEventMediator } from "../parking/mediators/ParkingEventMediator";
import { ParkingCaretaker } from "../parking/memento/ParkingCaretaker";
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
      .addCarSlots(2)
      .addBikeSlots(5)
      .addTruckSlots(2)

      .addFloor(2)
      .addCarSlots(3)
      .addBikeSlots(10)
      .addTruckSlots(5)

      .build();

    const factory = new MallParkingFactory();
    const strategy = factory.createParkingStrategy();

    const validator = new VehicleTypeValidator();

    validator
      .setNext(new ParkingLotOpenValidator())
      .setNext(new SlotCompatibilityValidator());

    const mediator = new ParkingEventMediator();
    const caretaker = new ParkingCaretaker();
    const parkingService = new ParkingService(
      parkingLot,
      strategy,
      validator,
      mediator,
      caretaker,
    );

    parkingService.addObserver(new DisplayBoard());

    parkingService.addObserver(new Logger());

    parkingService.addObserver(new Analytics());

    const proxy = new ParkingProxy(parkingService);

    return new ParkingFacade(proxy);
  }
}
