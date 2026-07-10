import { Vehicle } from "../modles/Vehicle";
import { Car } from "../modles/Car";
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