import { ParkingSlotType } from "../../shared/enums/ParkingSlotType";

export class ParkingSlotMetadata {
  constructor(
    public readonly slotType: ParkingSlotType,
    public readonly color: string,
    public readonly length: number,
    public readonly width: number,
    public readonly height: number,
  ) {}
}
