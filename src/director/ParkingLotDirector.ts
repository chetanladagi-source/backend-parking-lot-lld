import { IParkingLotBuilder } from "../builders/IParkingLotBuilder";

class ParkingLotDirector {
  constructor(private builder: IParkingLotBuilder) {}

  construct() {
    this.builder.buildName();

    this.builder.buildFloors();

    this.builder.buildSlots();

    this.builder.buildSecurity();

    this.builder.buildDisplayBoard();
  }
}
