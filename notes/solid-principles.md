# SOLID Principles

SOLID is five object-oriented design guidelines that keep code flexible and easy
to change. Below, each is defined and mapped to this codebase.

| Letter | Principle | One-liner |
|--------|-----------|-----------|
| **S** | Single Responsibility | A class should have one reason to change |
| **O** | Open/Closed | Open for extension, closed for modification |
| **L** | Liskov Substitution | Subtypes must be usable through the base type |
| **I** | Interface Segregation | Prefer many small interfaces over one fat one |
| **D** | Dependency Inversion | Depend on abstractions, not concretions |

---

## S — Single Responsibility Principle (SRP)

Every class in this project has exactly one job:

| Class | Its one responsibility |
|-------|------------------------|
| `ParkingService` | Orchestrate park/unpark |
| `BillingService` | Compute the bill |
| `FirstAvailableStrategy` | Find a slot |
| `ParkingLotBuilder` | Assemble a lot |
| `Logger` / `DisplayBoard` / `Analytics` | One reaction to an event each |
| `ParkVehicleCommand` | Represent one operation |
| `ParkingProxy` | Gate/security checks |

Concretely, notice that parking logic and billing logic never mix — they live in
separate services in separate modules:

```1:12:src/billing/services/BillingService.ts
export class BillingService {
  private readonly decoratorFactory = new DecoratorFactory();

  public calculate(ticket: ParkingTicket, services: AdditionalService[]): ParkingCharge {
    const baseCharge = new BaseParkingCharge(ticket);
    return this.decoratorFactory.decorate(baseCharge, services);
  }
}
```

**Why it matters:** a change to pricing rules touches only `billing/`; a change to
slot allocation touches only `strategies/`. The "reasons to change" are isolated.

---

## O — Open/Closed Principle (OCP)

You can add new behavior by adding a class, without editing existing ones. This
project is full of extension points:

- **New slot-finding rule** → implement `ParkingStrategy` (e.g.
  `NearestEntranceStrategy`) — `ParkingService` is untouched.
- **New event reaction** → implement `Observer` and call `addObserver(...)`.
- **New validation rule** → extend `ParkingValidator` and link it in the chain.
- **New add-on charge** → extend `ParkingChargeDecorator`.
- **New vehicle** → add a `VehicleCreator` subclass.

The service depends only on the abstractions, so it never needs modification:

```12:22:src/parking/services/ParkingService.ts
  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    this.validator.validate(vehicle, this.parkingLot);
    const slot = this.parkingStrategy.findAvailableSlot(this.parkingLot, vehicle);
    if (!slot) { throw new Error("Parking Lot Full"); }
    slot.parkVehicle(vehicle);
    this.notifyObservers(slot);
    return new ParkingTicket(randomUUID(), vehicle, slot);
  }
```

**Why it matters:** existing, tested code stays frozen; new features are additive,
which reduces the risk of regressions.

---

## L — Liskov Substitution Principle (LSP)

Any subtype can stand in for its base type without breaking callers.

- **`ParkingProxy` for `ParkingService`:** both implement `ParkingOperations`, so
  the Facade uses either interchangeably.

```5:6:src/parking/proxy/ParkingProxy.ts
export class ParkingProxy implements ParkingOperations {
  constructor(private readonly parkingService: ParkingOperations) {}
```

- **`Car`/`Bike`/`Truck` for `Vehicle`:** anywhere a `Vehicle` is expected, a
  concrete vehicle works, because each honors `getType()`.

```1:6:src/vehicle/models/Car.ts
export class Car extends Vehicle {
  getType(): VehicleType {
    return VehicleType.CAR;
  }
}
```

- **Decorators for `ParkingCharge`:** a `CarWashDecorator` *is-a* `ParkingCharge`,
  so it can wrap and be used anywhere a charge is expected.

**Why it matters:** the composition root can swap real service ↔ proxy, and the
billing code can wrap charges arbitrarily, all without special-casing.

**Watch-out in this repo:** `AvailableState.unpark()` omits the `slot` parameter
that the `ParkingSlotState` interface declares. It runs (TS allows fewer params),
but tightening the signature would make substitution cleaner.

---

## I — Interface Segregation Principle (ISP)

Interfaces here are tiny and focused, so implementers never carry methods they
don't use:

```1:6:src/parking/services/ParkingOperations.ts
export interface ParkingOperations {
  parkVehicle(vehicle: Vehicle): ParkingTicket;
  unparkVehicle(ticket: ParkingTicket): ParkingTicket;
}
```

```1:3:src/parking/commands/Command.ts
export interface Command<T> {
  execute(): T;
}
```

Others follow the same rule: `ParkingStrategy` (one method), `Observer` (one
method), `ParkingCharge` (two), `ParkingSlotState` (two).

**Why it matters:** a `Logger` only needs `update()` — it isn't forced to
implement unrelated methods. Small interfaces are easy to implement and mock.

---

## D — Dependency Inversion Principle (DIP)

High-level modules depend on **abstractions**, and concrete wiring is pushed to
the composition root.

- `ParkingFacade` depends on the `ParkingOperations` interface, not on
  `ParkingService`:

```9:10:src/parking/facade/ParkingFacade.ts
export class ParkingFacade {
  constructor(private readonly parkingOperations: ParkingOperations) {}
```

- `ParkingService` receives its strategy and validator as **injected
  abstractions** through the constructor:

```10:16:src/parking/services/ParkingService.ts
  constructor(
    private readonly parkingLot: ParkingLot,
    private readonly parkingStrategy: ParkingStrategy,
    private readonly validator: ParkingValidator,
  ) {}
```

- The commands depend on `ParkingOperations`, so they work with the proxy or the
  real service transparently.

**Why it matters:** the details (which strategy, whether a proxy is present) are
decided once in `Application.ts`. Everything else programs against interfaces,
which is what makes the system testable and swappable.

---

## Quick self-check table

| Principle | Best example in repo |
|-----------|----------------------|
| SRP | `ParkingService` vs `BillingService` split |
| OCP | Add a `Strategy`/`Observer`/`Decorator` without edits |
| LSP | `ParkingProxy` substitutes `ParkingService` |
| ISP | `Command`, `Observer`, `ParkingStrategy` one-method interfaces |
| DIP | `ParkingService` constructor takes abstractions |
