import { ParkingFactory } from "./ParkingFactory";

import { FirstAvailableStrategy } from "../strategies/FirstAvailableStrategy";

export class StadiumParkingFactory implements ParkingFactory {
  public createParkingStrategy() {
    return new FirstAvailableStrategy();
  }
}
