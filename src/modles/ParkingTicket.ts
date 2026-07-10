import { ParkingSlot } from "./ParkingSlot";
import { Vehicle } from "./Vehicle";

export class ParkingTicket {
  constructor(
    private readonly ticketId: string,
    private readonly vehicle: Vehicle,
    private readonly parkingSlot: ParkingSlot,
    private readonly entryTime: Date = new Date(),
    private exitTime: Date | null = null,
  ) {}

  public closeTicket(): void {
    this.exitTime = new Date();
  }

  public getParkingDurationInMinutes(): number {
    const endTime = this.exitTime ?? new Date();

    const duration = endTime.getTime() - this.entryTime.getTime();

    return Math.ceil(duration / (1000 * 60));
  }

  public getTicketId(): string {
    return this.ticketId;
  }

  public getVehicle(): Vehicle {
    return this.vehicle;
  }

  public getParkingSlot(): ParkingSlot {
    return this.parkingSlot;
  }

  public getEntryTime(): Date {
    return this.entryTime;
  }

  public getExitTime(): Date | null {
    return this.exitTime;
  }
}
