import { ParkingTicket } from "../models/ParkingTicket";

export class ParkingMemento {
  constructor(private readonly ticket: ParkingTicket) {}

  public getTicket(): ParkingTicket {
    return this.ticket;
  }
}
