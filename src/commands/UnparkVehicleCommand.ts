import { Command } from "./Command";

export class UnparkVehicleCommand implements Command {
  execute(): void {
    console.log("Vehicle Unparked");
  }
}
