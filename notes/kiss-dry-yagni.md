# KISS, DRY (and YAGNI)

These are pragmatic coding principles that complement SOLID. They are about
keeping code simple and non-repetitive.

---

## KISS — Keep It Simple, Stupid

**Definition:** prefer the simplest design that solves the problem. Avoid
cleverness and unnecessary complexity.

### Where the code stays simple

- **Tiny, single-purpose methods.** `FirstAvailableStrategy` is just a loop — no
  premature optimization, no indexing structures:

```7:22:src/parking/strategies/FirstAvailableStrategy.ts
    public findAvailableSlot(parkingLot: ParkingLot, vehicle: Vehicle): ParkingSlot | null {
        for (const floor of parkingLot.getAllFloors()) {
            const slot = floor.getAvailableSlot();
            if (slot) {
                return slot;
            }
        }
        return null;
    }
```

- **Simple enums** instead of elaborate type systems:

```1:5:src/shared/enums/VehicleType.ts
export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
  TRUCK = "TRUCK",
}
```

- **A thin Facade** that exposes two obvious methods (`parkVehicle`,
  `unparkVehicle`) so the client stays trivial:

```1:34:src/main.ts
const parkingFacade = Application.createParkingFacade();
const creator = new CarCreator();
const car = creator.createVehicle("KA01AB1234", "White");
const ticket = parkingFacade.parkVehicle(car);
```

**Why:** an interviewer can follow the happy path in seconds. Simplicity here is a
feature.

### A KISS tension worth naming

Using 12 patterns for a demo parking lot is arguably *over-engineered* for a real
product — that is the opposite of KISS. In this project it's intentional (it's a
learning/interview showcase). In production you'd apply patterns only where the
complexity pays for itself.

---

## DRY — Don't Repeat Yourself

**Definition:** every piece of knowledge should have a single, authoritative
representation. Eliminate duplicated logic.

### Where the code avoids repetition

- **Shared base classes hold common plumbing once.** `ParkingValidator` implements
  `setNext`/`validate` a single time; each concrete validator only adds its own
  `doValidate` — no repeated chain-walking code:

```5:23:src/parking/validators/ParkingValidator.ts
  public setNext(validator: ParkingValidator): ParkingValidator {
    this.nextValidator = validator;
    return validator;
  }
  public validate(vehicle: Vehicle, parkingLot: ParkingLot): void {
    this.doValidate(vehicle, parkingLot);
    if (this.nextValidator) {
      this.nextValidator.validate(vehicle, parkingLot);
    }
  }
```

- **Slot creation loop is factored into one private helper** rather than repeating
  three near-identical blocks for car/bike/truck:

```59:76:src/parking/builders/ParkingLotBuilder.ts
  private addSlots(slotType: ParkingSlotType, count: number, prefix: string): void {
    for (let i = 1; i <= count; i++) {
      this.currentFloor!.addSlot(
        new ParkingSlot(`F${this.currentFloorNumber}-${prefix}${i}`, slotType),
      );
    }
  }
```

`addCarSlots`, `addBikeSlots`, `addTruckSlots` all delegate here — the naming and
insertion logic exists once.

- **`Vehicle` base holds registration/color/`displayInfo` once**, so `Car`,
  `Bike`, `Truck` don't re-declare them.

- **Enums centralize magic strings** (`VehicleType`, `ParkingSlotType`,
  `AdditionalService`) so the same literal isn't scattered across files.

**Why:** a rule (e.g., "slot id format is `F{floor}-{prefix}{n}`") lives in exactly
one place, so changing it is a one-line edit.

### A DRY smell worth naming

`VehicleType` and `ParkingSlotType` are essentially the same enum duplicated. And
`ParkingConfiguration.registerObservers()` duplicates the observer wiring already
done inline in `Application.ts`. Both are candidates for consolidation.

---

## YAGNI — You Aren't Gonna Need It (bonus)

**Definition:** don't build features until they're actually required.

This repo *intentionally violates* YAGNI to serve as a pattern catalog. The empty
placeholders are speculative structure built ahead of need:

- `payment/` (adapters, providers, services) — all empty `.gitkeep`
- `NearestEntranceStrategy`, `EVChargingStrategy`, `ReservedState` — empty stubs
- `AirportParkingBuilder`, `MallParkingBuilder`, `StadiumParkingBuilder` — empty
- `ParkingLotDirector` — written but not wired to any concrete builder

**Takeaway for an interview:** it's fine to *sketch* extension points, but in a
real codebase these empty files add noise. YAGNI says delete them until the
feature is scheduled.

---

## Summary

| Principle | Followed by | Tension in this repo |
|-----------|-------------|----------------------|
| KISS | Small methods, thin facade, plain loops | 12 patterns is heavy for the domain |
| DRY | Base classes, `addSlots` helper, enums | Duplicate enums + duplicate observer wiring |
| YAGNI | — | Many empty speculative stubs |
