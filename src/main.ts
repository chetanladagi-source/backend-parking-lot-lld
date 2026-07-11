import { Application } from "./app/Application";
import { AdditionalService } from "./shared/enums/AdditionalService";

import { CarCreator } from "./vehicle/factories/CarCreator";
import { BillingService } from "./billing/services/BillingService";
import { RazorpayPaymentProcessor } from "./payment/template/RazorpayPaymentProcessor";
import { MonthlyParkingPass } from "./parking/models/MonthlyParkingPass";
import { SlotFilterBuilder } from "./parking/interpreter/SlotFilterBuilder";
import { RevenueReportVisitor } from "./parking/visitor/RevenueReportVisitor";
import { ParkingSlotType } from "./shared/enums/ParkingSlotType";

const parkingFacade = Application.createParkingFacade();

parkingFacade.printAvailableSlot();

parkingFacade.printExpressionSlots(
  SlotFilterBuilder.create().ofType(ParkingSlotType.TRUCK).available().build(),
);

parkingFacade.printRevenueReport(new RevenueReportVisitor());

const templatePass = new MonthlyParkingPass(
  "Default Owner",
  "DEFAULT",
  30,
  "Premium",
);

const pass1 = templatePass.clone();

pass1.ownerName = "Rahul";
pass1.vehicleNumber = "KA01AA1111";

const pass2 = templatePass.clone();

pass2.ownerName = "Ankit";
pass2.vehicleNumber = "KA01BB2222";

console.log(pass1);

console.log(pass2);

const creator = new CarCreator();

const car = creator.createVehicle("KA01AB1234", "White");

const ticket = parkingFacade.parkVehicle(car);

console.log("--------------------------------");

console.log("Ticket ID :", ticket.getTicketId());

console.log("Slot :", ticket.getParkingSlot().getSlotNumber());

console.log("Entry Time :", ticket.getEntryTime());
console.log("--------------------------------");
parkingFacade.printExpressionSlots(
  SlotFilterBuilder.create().ofType(ParkingSlotType.CAR).available().build(),
);
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
}, 3000);
