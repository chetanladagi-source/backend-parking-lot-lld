import { Analytics } from "../../parking/observers/Analytics";
import { DisplayBoard } from "../../parking/observers/DisplayBoard";
import { Logger } from "../../parking/observers/Logger";
import { ParkingService } from "../../parking/services/ParkingService";

export function registerObservers(parkingService: ParkingService) {
  parkingService.addObserver(new DisplayBoard());
  parkingService.addObserver(new Logger());
  parkingService.addObserver(new Analytics());
}
