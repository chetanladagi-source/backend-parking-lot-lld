import { Truck } from "../modles/Truck";
import { Vehicle } from "../modles/Vehicle";
import { VehicleCreator } from "./VehicleCreator";

export class TruckCreator extends VehicleCreator {

    createVehicle(
        registrationNumber: string,
        color: string
    ): Vehicle {

        return new Truck(
            registrationNumber,
            color
        );

    }

}