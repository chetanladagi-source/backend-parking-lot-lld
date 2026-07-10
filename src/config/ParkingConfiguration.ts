import { Analytics } from "../observers/Analytics";
import { DisplayBoard } from "../observers/DisplayBoard";
import { Logger } from "../observers/Logger";
import { ParkingService } from "../services/ParkingService";

export function registerObservers(parkingService: ParkingService) {
  parkingService.addObserver(new DisplayBoard());
  parkingService.addObserver(new Logger());
  parkingService.addObserver(new Analytics());
}
