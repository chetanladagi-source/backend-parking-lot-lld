import { ParkingFactory } from "./ParkingFactory";

import { FirstAvailableStrategy } from "../strategies/FirstAvailableStrategy";

export class MallParkingFactory implements ParkingFactory {
  public createParkingStrategy() {
    return new FirstAvailableStrategy();
  }
}
