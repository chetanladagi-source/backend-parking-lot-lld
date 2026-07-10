import { Application } from "./app/Application";

import { CarCreator } from "./factories/CarCreator";

const parkingFacade = Application.createParkingFacade();

const creator = new CarCreator();

const car = creator.createVehicle("KA01AB1234", "White");

const ticket = parkingFacade.parkVehicle(car);

console.log("--------------------------------");

console.log("Ticket ID :", ticket.getTicketId());

console.log("Slot :", ticket.getParkingSlot().getSlotNumber());

console.log("Entry Time :", ticket.getEntryTime());
console.log("--------------------------------");
setTimeout(() => {
  const completedTicket = parkingFacade.unparkVehicle(ticket);

  console.log(
    "Duration :",
    completedTicket.getParkingDurationInMinutes(),
    "minutes",
  );
}, 5000);
