import { Bike } from "../modles/Bike";
import { Vehicle } from "../modles/Vehicle";
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