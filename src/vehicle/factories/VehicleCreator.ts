import { Vehicle } from "../models/Vehicle";

export abstract class VehicleCreator {

    abstract createVehicle(
        registrationNumber: string,
        color: string
    ): Vehicle;

}