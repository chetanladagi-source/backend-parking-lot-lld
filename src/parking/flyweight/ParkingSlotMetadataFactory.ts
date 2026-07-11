import { ParkingSlotMetadata } from "./ParkingSlotMetadata";

import { ParkingSlotType } from "../../shared/enums/ParkingSlotType";

export class ParkingSlotMetadataFactory {
  private static readonly cache = new Map<
    ParkingSlotType,
    ParkingSlotMetadata
  >();

  public static getMetadata(slotType: ParkingSlotType): ParkingSlotMetadata {
    if (!this.cache.has(slotType)) {
      switch (slotType) {
        case ParkingSlotType.CAR:
          this.cache.set(
            slotType,

            new ParkingSlotMetadata(
              ParkingSlotType.CAR,

              5,

              2,

              2,

              "Green",
            ),
          );

          break;

        case ParkingSlotType.BIKE:
          this.cache.set(
            slotType,

            new ParkingSlotMetadata(
              ParkingSlotType.BIKE,

              2,

              1,

              1,

              "Blue",
            ),
          );

          break;

        case ParkingSlotType.TRUCK:
          this.cache.set(
            slotType,

            new ParkingSlotMetadata(
              ParkingSlotType.TRUCK,

              10,

              3,

              3,

              "Red",
            ),
          );

          break;
      }
    }

    return this.cache.get(slotType)!;
  }
}
