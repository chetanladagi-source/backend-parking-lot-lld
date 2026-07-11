import { ParkingStrategy } from "../strategies/ParkingStrategy";

export interface ParkingFactory {
  createParkingStrategy(): ParkingStrategy;
}
