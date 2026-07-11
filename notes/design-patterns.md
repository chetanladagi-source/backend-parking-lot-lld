# Design Patterns

This project deliberately packs many Gang-of-Four patterns into one system so each
one can be studied in context. They are grouped below as **Creational**,
**Structural**, and **Behavioral**.

| Pattern | Type | Where | Why here |
|---------|------|-------|----------|
| Singleton | Creational | `ParkingLot` | One physical lot instance |
| Builder | Creational | `ParkingLotBuilder` | Fluent, step-by-step lot construction |
| Factory Method | Creational | `VehicleCreator` + `CarCreator`/`BikeCreator`/`TruckCreator` | Subclass decides the concrete vehicle |
| Simple Factory | Creational | `VehicleFactory` | Central `switch` on type |
| Strategy | Behavioral | `ParkingStrategy` + `FirstAvailableStrategy` | Swap slot-selection algorithm |
| State | Behavioral | `ParkingSlotState` + `Available/Occupied` | Slot behavior changes with its state |
| Observer | Behavioral | `Observer` + `Logger/DisplayBoard/Analytics` | Broadcast park/unpark events |
| Chain of Responsibility | Behavioral | `ParkingValidator` chain | Sequential, extendable validation |
| Command | Behavioral | `Command` + `Park/UnparkVehicleCommand` | Encapsulate an operation as an object |
| Facade | Structural | `ParkingFacade` | One simple API over subsystems |
| Proxy | Structural | `ParkingProxy` | Gate/security checks before the real service |
| Composite | Structural | `ParkingComponent`/`ParkingComposite`/`ParkingSlot` | Uniform tree of parking parts |
| Decorator | Structural | `ParkingChargeDecorator` + add-ons | Stack optional charges at runtime |

---

## Creational

### Singleton — `ParkingLot`

There is only one physical parking lot, so the model enforces one instance.

```1:20:src/parking/models/ParkingLot.ts
export class ParkingLot {
  private static instance: ParkingLot;
  private parkingFloors: ParkingFloor[] = [];

  private constructor(private readonly name: string) {}

  public static getInstance(name: string): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot(name);
    }
    return ParkingLot.instance;
  }
```

- **Private constructor** blocks `new ParkingLot()` from outside.
- **`getInstance`** returns the single shared object.
- **Why:** guarantees every service, strategy, and validator operates on the
  *same* lot state. (Trade-off: singletons are global state and can complicate
  testing — acceptable for this demo's single-lot domain.)

### Builder — `ParkingLotBuilder`

Constructing a lot means "add floor, then add many slot types" — a multi-step
process. The builder gives a readable fluent API and returns `this` each step.

```27:41:src/parking/builders/ParkingLotBuilder.ts
  public addFloor(floorNumber: number): ParkingLotBuilder {
    const floor = new ParkingFloor(floorNumber);
    this.parkingLot.addFloor(floor);
    this.currentFloor = floor;
    this.currentFloorNumber = floorNumber;
    return this;
  }
```

Client reads like a sentence:

```16:26:src/app/Application.ts
    const parkingLot = new ParkingLotBuilder("Forum Mall")
      .addFloor(1)
      .addCarSlots(10)
      .addBikeSlots(5)
      .addTruckSlots(2)
      .addFloor(2)
      // ...
      .build();
```

- **Why:** avoids a giant constructor with many arguments, and lets each lot be
  configured differently. `IParkingLotBuilder` + `ParkingLotDirector` sketch the
  next step (a Director orchestrating standard builds like airport/mall/stadium),
  but those concrete builders are still stubs.

### Factory Method — `VehicleCreator`

Each creator subclass is responsible for instantiating one product type.

```1:14:src/vehicle/factories/CarCreator.ts
export class CarCreator extends VehicleCreator {
    createVehicle(registrationNumber: string, color: string): Vehicle {
        return new Car(registrationNumber, color);
    }
}
```

- **Why:** the caller depends on the abstract `VehicleCreator`/`Vehicle` and never
  hard-codes `new Car(...)`. Adding an `EVCreator` means adding one class — no
  edits to existing creators (Open/Closed).

### Simple Factory — `VehicleFactory`

An alternative, centralized creation point using a `switch`:

```9:27:src/vehicle/factories/VehicleFactory.ts
  public static createVehicle(type: VehicleType, registrationNumber: string, color: string): Vehicle {
    switch (type) {
      case VehicleType.CAR:   return new Car(registrationNumber, color);
      case VehicleType.BIKE:  return new Bike(registrationNumber, color);
      case VehicleType.TRUCK: return new Truck(registrationNumber, color);
      default: throw new Error("Unsupported vehicle type");
    }
  }
```

- **Factory Method vs Simple Factory:** Factory Method uses polymorphism (add a
  subclass, don't touch existing code); Simple Factory concentrates the logic in
  one method (easier to read, but you must edit the `switch` to add a type). The
  repo keeps both to contrast them.

---

## Structural

### Facade — `ParkingFacade`

Hides the proxy/command/service machinery behind two friendly methods.

```9:23:src/parking/facade/ParkingFacade.ts
export class ParkingFacade {
  constructor(private readonly parkingOperations: ParkingOperations) {}

  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    const command = new ParkVehicleCommand(this.parkingOperations, vehicle);
    return command.execute();
  }
```

- **Why:** the client just calls `facade.parkVehicle(car)` and stays ignorant of
  commands, proxies, validators, strategies, and observers.

### Proxy — `ParkingProxy`

Same interface as the real service (`ParkingOperations`), adds pre-checks, then
delegates.

```5:18:src/parking/proxy/ParkingProxy.ts
export class ParkingProxy implements ParkingOperations {
  constructor(private readonly parkingService: ParkingOperations) {}

  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    console.log("Checking Gate Security...");
    console.log("Checking Blacklist...");
    console.log("Checking Monthly Pass...");
    return this.parkingService.parkVehicle(vehicle);
  }
```

- **Why:** it's a **protection proxy** — cross-cutting gate/security concerns live
  here, so `ParkingService` stays focused purely on parking. Because it implements
  the same interface, callers can't tell the proxy from the real thing (LSP).

### Composite — `ParkingComponent` / `ParkingComposite` / `ParkingSlot`

A base defines the uniform interface; a leaf (`ParkingSlot`) overrides `display`.

```1:22:src/parking/composite/ParkingComponent.ts
export abstract class ParkingComponent {
  constructor(protected readonly name: string) {}
  public getName(): string { return this.name; }
  public add(component: ParkingComponent): void {
    throw new Error(`${this.constructor.name} does not support add().`);
  }
  public getChildren(): ParkingComponent[] { return []; }
  public abstract display(indent?: string): void;
}
```

- **Why:** lets the whole lot be treated as a uniform tree (lot → floor → slot)
  so a single `display()` call can recurse.
- **Status in this repo:** only `ParkingSlot` extends the composite tree today;
  `ParkingLot` and `ParkingFloor` don't yet extend `ParkingComposite`, so the
  pattern is intentionally half-wired (a good "what would you finish next" talking
  point).

### Decorator — `ParkingChargeDecorator` + add-ons

Wrap a `ParkingCharge` to add cost/description without subclassing every combo.

```1:9:src/billing/decorators/ParkingChargeDecorator.ts
export abstract class ParkingChargeDecorator implements ParkingCharge {
  constructor(protected readonly charge: ParkingCharge) {}
  public abstract getAmount(): number;
  public abstract getDescription(): string;
}
```

```1:9:src/billing/decorators/CarWashDecorator.ts
export class CarWashDecorator extends ParkingChargeDecorator {
  getAmount(): number { return this.charge.getAmount() + 200; }
  getDescription(): string { return this.charge.getDescription() + " + Car Wash"; }
}
```

- **Why:** services (car wash, EV charging, premium) are optional and combinable.
  Decorators stack at runtime, so 3 add-ons need 3 classes — not 2³ subclasses.
  `DecoratorFactory` builds the stack from an enum list, and `BillingService`
  just calls `getAmount()` / `getDescription()` on the final wrapper.

---

## Behavioral

### Strategy — `ParkingStrategy` + `FirstAvailableStrategy`

Slot-finding is an interchangeable algorithm behind an interface.

```1:6:src/parking/strategies/ParkingStrategy.ts
export interface ParkingStrategy {
  findAvailableSlot(parkingLot: ParkingLot, vehicle: Vehicle): ParkingSlot | null;
}
```

- **Why:** `ParkingService` depends on the interface, so you can drop in
  `NearestEntranceStrategy` or `EVChargingStrategy` (stubs today) without touching
  the service. The chosen strategy is injected in `Application`.

### State — `ParkingSlotState` + `AvailableState` / `OccupiedState`

The slot delegates behavior to a state object and swaps it on transition.

```1:12:src/parking/states/AvailableState.ts
export class AvailableState implements ParkingSlotState {
  park(slot: ParkingSlot, vehicle: Vehicle): void {
    slot.setVehicle(vehicle);
    slot.setState(new OccupiedState());
    console.log("Vehicle Parked");
  }
  unpark(): void { throw new Error("Slot already empty."); }
}
```

- **Why:** replaces `if (status === AVAILABLE) ... else ...` branching with
  polymorphism. An occupied slot *cannot* be occupied again, and an empty slot
  *cannot* be emptied — the illegal transitions throw, encoded by type rather than
  by conditionals. `ReservedState` is the intended next state (stub).

### Observer — `Observer` + `Logger` / `DisplayBoard` / `Analytics`

`ParkingService` publishes; observers react.

```12:37:src/parking/services/ParkingService.ts
  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    this.validator.validate(vehicle, this.parkingLot);
    const slot = this.parkingStrategy.findAvailableSlot(this.parkingLot, vehicle);
    if (!slot) { throw new Error("Parking Lot Full"); }
    slot.parkVehicle(vehicle);
    this.notifyObservers(slot);
    return new ParkingTicket(randomUUID(), vehicle, slot);
  }
  public addObserver(observer: Observer): void { this.observers.push(observer); }
  private notifyObservers(slot: ParkingSlot): void {
    for (const observer of this.observers) { observer.update(slot); }
  }
```

- **Why:** logging, display boards, and analytics are decoupled side effects. Add
  a new subscriber (e.g., SMS alert) without editing the service — just
  `addObserver(...)`.

### Chain of Responsibility — `ParkingValidator`

Each validator does its check then forwards to the next link.

```1:23:src/parking/validators/ParkingValidator.ts
export abstract class ParkingValidator {
  private nextValidator?: ParkingValidator;
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
  protected abstract doValidate(vehicle: Vehicle, parkingLot: ParkingLot): void;
}
```

- **Why:** validation rules are independent and ordered. You can insert/remove a
  link (`VehicleType → LotOpen → SlotCompatibility`) without rewriting the others.
  `setNext` returns the passed validator so the chain reads fluently in
  `Application`.
- **Note:** each `doValidate` currently just logs; in a real system it would throw
  on failure and short-circuit the chain.

### Command — `Command` + `ParkVehicleCommand` / `UnparkVehicleCommand`

Each operation is a first-class object.

```5:14:src/parking/commands/ParkVehicleCommand.ts
export class ParkVehicleCommand implements Command<ParkingTicket> {
  constructor(
    private readonly parkingOperations: ParkingOperations,
    private readonly vehicle: Vehicle,
  ) {}
  public execute(): ParkingTicket {
    return this.parkingOperations.parkVehicle(this.vehicle);
  }
}
```

- **Why:** encapsulating "park this vehicle" as an object is the foundation for
  queuing, logging, undo/redo, or retry. The Facade creates and executes commands,
  keeping the request and its invoker decoupled.

---

## How the patterns collaborate (the big picture)

```
Facade  →  Command  →  Proxy  →  Service
                                   ├─ Chain of Responsibility (validate)
                                   ├─ Strategy (find slot)
                                   ├─ State (slot transition)
                                   └─ Observer (notify)

ParkingLot = Singleton, built by Builder, made of Composite parts
Vehicle    = created by Factory (Method / Simple)
Billing    = Base charge + Decorator stack (assembled by a Factory)
```

The key lesson: **patterns are not used in isolation**. A single `parkVehicle`
call flows through six of them, each solving one small, separate concern.
