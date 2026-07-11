import { ParkingEvent } from "../../shared/enums/ParkingEvent";

export interface ParkingMediator {
  notify(sender: object, event: ParkingEvent, data?: unknown): void;
}
