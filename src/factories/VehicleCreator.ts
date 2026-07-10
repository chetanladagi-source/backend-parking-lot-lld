import { Vehicle } from "../modles/Vehicle";

export abstract class VehicleCreator {

    abstract createVehicle(
        registrationNumber: string,
        color: string
    ): Vehicle;

}