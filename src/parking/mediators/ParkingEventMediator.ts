import { ParkingEvent } from "../../shared/enums/ParkingEvent";
import { ParkingMediator } from "./ParkingMediator";

export class ParkingEventMediator implements ParkingMediator {
  public notify(sender: object, event: ParkingEvent, data?: unknown): void {
    switch (event) {
      case ParkingEvent.VEHICLE_PARKED:
        console.log("Mediator : Vehicle Parked");
        break;

      case ParkingEvent.VEHICLE_EXITED:
        console.log("Mediator : Vehicle Exited");
        break;

      case ParkingEvent.PAYMENT_SUCCESS:
        console.log("Mediator : Payment Success");
        break;

      case ParkingEvent.PAYMENT_FAILED:
        console.log("Mediator : Payment Failed");
        break;
    }
  }
}
