import { ParkingTicket } from "../modles/ParkingTicket";

import { ParkingCharge } from "./ParkingCharge";

export class BaseParkingCharge implements ParkingCharge {
  constructor(private ticket: ParkingTicket) {}

  getAmount(): number {
    const hours = Math.ceil(this.ticket.getParkingDurationInMinutes() / 60);

    return hours * 20;
  }

  getDescription(): string {
    return "Parking Charge";
  }
}
