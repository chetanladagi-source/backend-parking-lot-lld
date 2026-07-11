import { Application } from "./app/Application";
import { AdditionalService } from "./shared/enums/AdditionalService";

import { CarCreator } from "./vehicle/factories/CarCreator";
import { BillingService } from "./billing/services/BillingService";
import { RazorpayPaymentProcessor } from "./payment/template/RazorpayPaymentProcessor";

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

  const billingService = new BillingService();

  const bill = billingService.calculate(completedTicket, [
    AdditionalService.CAR_WASH,
    AdditionalService.PREMIUM_PARKING,
    AdditionalService.EV_CHARGING,
  ]);

  console.log("-------------------------");

  console.log(bill.getDescription());

  console.log("Amount : ₹", bill.getAmount());

  const processor = new RazorpayPaymentProcessor();

  processor.process(500);
}, 10000);
