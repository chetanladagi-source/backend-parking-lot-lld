import { Bike } from "../models/Bike";
import { Vehicle } from "../models/Vehicle";
import { VehicleCreator } from "./VehicleCreator";

export class BikeCreator extends VehicleCreator {

    createVehicle(
        registrationNumber: string,
        color: string
    ): Vehicle {

        return new Bike(
            registrationNumber,
            color
        );

    }

}