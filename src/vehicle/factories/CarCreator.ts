import { Vehicle } from "../models/Vehicle";
import { Car } from "../models/Car";
import { VehicleCreator } from "./VehicleCreator";

export class CarCreator extends VehicleCreator {

    createVehicle(
        registrationNumber: string,
        color: string
    ): Vehicle {

        return new Car(
            registrationNumber,
            color
        );

    }

}