import { Truck } from "../models/Truck";
import { Vehicle } from "../models/Vehicle";
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