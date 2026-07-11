import { ParkingSlot } from "./ParkingSlot";

export class ParkingFloor {

    private parkingSlots: ParkingSlot[] = [];

    constructor(
        private readonly floorNumber: number
    ) {}

    public addSlot(slot: ParkingSlot): void {
        this.parkingSlots.push(slot);
    }

    public removeSlot(slotNumber: string): void {

        this.parkingSlots = this.parkingSlots.filter(
            slot => slot.getSlotNumber() !== slotNumber
        );

    }

    public getAvailableSlot(): ParkingSlot | null {

        for (const slot of this.parkingSlots) {

            if (slot.isAvailable()) {
                return slot;
            }

        }

        return null;

    }

    public getAllSlots(): ParkingSlot[] {
        return this.parkingSlots;
    }

    public getFloorNumber(): number {
        return this.floorNumber;
    }

}