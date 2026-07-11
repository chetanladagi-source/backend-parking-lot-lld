import { ParkingMemento } from "./ParkingMemento";

export class ParkingCaretaker {
  private readonly history: ParkingMemento[] = [];

  public save(memento: ParkingMemento): void {
    this.history.push(memento);
  }

  public undo(): ParkingMemento | undefined {
    return this.history.pop();
  }
}
