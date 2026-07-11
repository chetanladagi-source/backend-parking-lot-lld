import { ParkingFactory } from "./ParkingFactory";

import { FirstAvailableStrategy } from "../strategies/FirstAvailableStrategy";

export class AirportParkingFactory implements ParkingFactory {
  public createParkingStrategy() {
    return new FirstAvailableStrategy();
  }
}
