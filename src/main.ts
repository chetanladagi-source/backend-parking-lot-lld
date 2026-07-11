import { Application } from "./app/Application";
import { AdditionalService } from "./shared/enums/AdditionalService";
import { ParkingSlotType } from "./shared/enums/ParkingSlotType";

import { CarCreator } from "./vehicle/factories/CarCreator";
import { BillingService } from "./billing/services/BillingService";
import { RazorpayPaymentProcessor } from "./payment/template/RazorpayPaymentProcessor";
import { MonthlyParkingPass } from "./parking/models/MonthlyParkingPass";
import { SlotFilterBuilder } from "./parking/interpreter/SlotFilterBuilder";
import { RevenueReportVisitor } from "./parking/visitor/RevenueReportVisitor";

import { ParkingFacade } from "./parking/facade/ParkingFacade";
import { ParkingTicket } from "./parking/models/ParkingTicket";

const UNPARK_DELAY_MS = 3000;

function logSection(title: string): void {
  console.log("\n" + "=".repeat(40));
  console.log(title);
  console.log("=".repeat(40));
}

function showInitialAvailability(facade: ParkingFacade): void {
  logSection("Initial Availability");

  // facade.printAvailableSlot();

  facade.printExpressionSlots(
    SlotFilterBuilder.create().ofType(ParkingSlotType.CAR).available().build(),
  );

  // facade.printRevenueReport(new RevenueReportVisitor());
}

function demoMonthlyPassCloning(): void {
  logSection("Monthly Pass Cloning (Prototype)");

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
}

function parkCar(facade: ParkingFacade): ParkingTicket {
  logSection("Park Vehicle");

  const car = new CarCreator().createVehicle("KA01AB1234", "White");
  const ticket = facade.parkVehicle(car);

  console.log("Ticket ID  :", ticket.getTicketId());
  console.log("Slot       :", ticket.getParkingSlot().getSlotNumber());
  console.log("Entry Time :", ticket.getEntryTime());

  facade.printExpressionSlots(
    SlotFilterBuilder.create().ofType(ParkingSlotType.CAR).available().build(),
  );

  return ticket;
}

function unparkAndBill(facade: ParkingFacade, ticket: ParkingTicket): void {
  logSection("Unpark, Bill & Pay");

  const completedTicket = facade.unparkVehicle(ticket);

  console.log(
    "Duration :",
    completedTicket.getParkingDurationInMinutes(),
    "minutes",
  );

  const bill = new BillingService().calculate(completedTicket, [
    AdditionalService.CAR_WASH,
    AdditionalService.PREMIUM_PARKING,
    AdditionalService.EV_CHARGING,
  ]);

  console.log(bill.getDescription());
  console.log("Amount : ₹", bill.getAmount());

  new RazorpayPaymentProcessor().process(500);
}

function main(): void {
  const parkingFacade = Application.createParkingFacade();

  // showInitialAvailability(parkingFacade);
  // demoMonthlyPassCloning();

  const ticket = parkCar(parkingFacade);
  showInitialAvailability(parkingFacade);
  const ticket2 = parkCar(parkingFacade);
  showInitialAvailability(parkingFacade);
  const ticket3 = parkCar(parkingFacade);

  // setTimeout(() => unparkAndBill(parkingFacade, ticket), UNPARK_DELAY_MS);
}

main();
