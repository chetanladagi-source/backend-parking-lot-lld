# OOP Concepts

The four pillars of Object-Oriented Programming, each mapped to this codebase.

| Pillar | Meaning | Prime example here |
|--------|---------|--------------------|
| Abstraction | Expose *what*, hide *how* | `Vehicle`, `ParkingOperations` |
| Encapsulation | Protect state behind methods | `ParkingLot`, `ParkingSlot`, `ParkingTicket` |
| Inheritance | Reuse via an is-a hierarchy | `Vehicle` → `Car/Bike/Truck` |
| Polymorphism | One interface, many behaviors | `strategy`, `state`, `observer`, decorators |

---

## 1. Abstraction

Abstraction means the caller works with a simplified contract and never sees the
implementation details.

- **Abstract classes** define a shape and leave specifics to subclasses:

```1:20:src/vehicle/models/Vehicle.ts
export abstract class Vehicle {
  constructor(
    private readonly registrationNumber: string,
    private readonly color: string,
  ) {}

  abstract getType(): VehicleType;

  public getRegistrationNumber(): string {
    return this.registrationNumber;
  }
  // ...
}
```

`Vehicle` says "every vehicle has a type" (`abstract getType()`) but doesn't say
*what* type — each subclass fills that in.

- **Interfaces** abstract behavior without any implementation. The client of
  `ParkingOperations` knows it can park/unpark, nothing more:

```1:6:src/parking/services/ParkingOperations.ts
export interface ParkingOperations {
  parkVehicle(vehicle: Vehicle): ParkingTicket;
  unparkVehicle(ticket: ParkingTicket): ParkingTicket;
}
```

Other abstractions: `ParkingStrategy`, `ParkingSlotState`, `Observer`, `Command`,
`ParkingCharge`, `ParkingValidator`, `ParkingComponent`, `VehicleCreator`.

**Why:** callers depend on stable contracts, so implementations can change freely.

---

## 2. Encapsulation

Encapsulation hides internal state behind `private` fields and controlled
accessors, so invariants can't be violated from outside.

- **`ParkingSlot`** keeps its vehicle and state private; you can only change them
  through methods that enforce the rules:

```9:35:src/parking/models/ParkingSlot.ts
export class ParkingSlot extends ParkingComponent {
  private parkedVehicle: Vehicle | null = null;
  private state: ParkingSlotState;

  public parkVehicle(vehicle: Vehicle): void {
    this.state.park(this, vehicle);
  }
  public unparkVehicle(): void {
    this.state.unpark(this);
  }
  // controlled setters used by the state objects
  public setVehicle(vehicle: Vehicle | null): void {
    this.parkedVehicle = vehicle;
  }
```

- **`ParkingTicket`** makes almost everything `readonly` and only lets exit time be
  set via `closeTicket()` — you cannot forge a duration:

```1:20:src/parking/models/ParkingTicket.ts
export class ParkingTicket {
  constructor(
    private readonly ticketId: string,
    private readonly vehicle: Vehicle,
    private readonly parkingSlot: ParkingSlot,
    private readonly entryTime: Date = new Date(),
    private exitTime: Date | null = null,
  ) {}

  public closeTicket(): void {
    this.exitTime = new Date();
  }
```

- **`ParkingLot`** hides the floor list and the singleton instance behind a
  private constructor and getters.

**Why:** external code can't put a slot into an inconsistent state or tamper with
timing/pricing data. The object protects its own invariants.

---

## 3. Inheritance

Inheritance models an **is-a** relationship and shares common code from a base.

- **Vehicle hierarchy** — `Car`, `Bike`, `Truck` all *are* `Vehicle` and inherit
  registration/color handling, overriding only `getType()`:

```1:6:src/vehicle/models/Truck.ts
export class Truck extends Vehicle {
  getType(): VehicleType {
    return VehicleType.TRUCK;
  }
}
```

Other hierarchies:

- `ParkingComponent` → `ParkingComposite` → `ParkingSlot` (composite tree)
- `ParkingValidator` → `VehicleTypeValidator` / `ParkingLotOpenValidator` /
  `SlotCompatibilityValidator`
- `ParkingChargeDecorator` → `CarWash` / `EVCharging` / `PremiumParking`
- `VehicleCreator` → `CarCreator` / `BikeCreator` / `TruckCreator`

**Why:** shared logic (e.g., the validator's `setNext`/`validate` plumbing) lives
once in the base; subclasses supply only the differing bit (`doValidate`).

---

## 4. Polymorphism

Polymorphism lets one call site invoke many different behaviors through a common
type. This is the engine behind most of the design patterns here.

- **Strategy** — `ParkingService` calls `findAvailableSlot()` without knowing the
  concrete algorithm:

```16:19:src/parking/services/ParkingService.ts
    const slot = this.parkingStrategy.findAvailableSlot(
      this.parkingLot,
      vehicle,
    );
```

- **State** — the same `slot.parkVehicle()` call behaves differently depending on
  the current state object (`AvailableState` parks; `OccupiedState` throws).

- **Observer** — one loop calls `update()` on many different subscribers:

```39:43:src/parking/services/ParkingService.ts
  private notifyObservers(slot: ParkingSlot): void {
    for (const observer of this.observers) {
      observer.update(slot);
    }
  }
```

- **Decorator** — `getAmount()` resolves through whatever chain of wrappers was
  stacked, each adding its own cost.

**Why:** adding a new algorithm/subscriber/charge doesn't change these call sites
— they already speak to the interface. Polymorphism is what makes OCP possible.

---

## How the four pillars reinforce each other

- **Abstraction** defines the contract (`ParkingStrategy`).
- **Inheritance/implementation** provides variants (`FirstAvailableStrategy`).
- **Polymorphism** lets callers use variants through the contract.
- **Encapsulation** keeps each variant's internal state safe.

Together they produce loosely coupled, easily extended code — the whole point of
this LLD exercise.
