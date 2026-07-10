import { CarCreator } from "./factories/CarCreator";
import { Application } from "./app/Application";

const facade = Application.createParkingFacade();

const creator = new CarCreator();
const car = creator.createVehicle("KA01AB1234", "White");

facade.parkVehicle(car);
