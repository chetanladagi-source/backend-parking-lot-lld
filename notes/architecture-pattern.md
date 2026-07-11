# Architecture Pattern

## What architecture is this?

A **layered (n-tier) architecture** organized by **feature modules**, with a
**Composition Root** and a **Facade** as the single entry into the domain.

Two ideas combine here:

1. **Package-by-feature** — top-level folders are business capabilities
   (`parking/`, `vehicle/`, `billing/`, `payment/`), not technical types.
2. **Layering inside each feature** — every feature separates `models/`
   (data + rules), `services/` (orchestration), and pattern-specific folders
   (`strategies/`, `states/`, `observers/`, etc.).

## The layers

```
┌───────────────────────────────────────────────┐
│ Entry / Presentation                           │
│   src/main.ts                                  │
├───────────────────────────────────────────────┤
│ Application / Composition Root                 │
│   src/app/Application.ts                       │
├───────────────────────────────────────────────┤
│ API boundary (Facade + Proxy + Command)        │
│   parking/facade, parking/proxy, parking/commands
├───────────────────────────────────────────────┤
│ Domain Services                                │
│   parking/services, billing/services           │
├───────────────────────────────────────────────┤
│ Domain Models + Patterns                       │
│   parking/models, vehicle/models, billing/models
│   strategies, states, validators, observers    │
├───────────────────────────────────────────────┤
│ Shared Kernel                                  │
│   shared/enums, shared/config                   │
└───────────────────────────────────────────────┘
```

The dependency rule is one-directional: **outer layers depend on inner layers,
never the reverse.** `main.ts` knows about the Facade; the Facade knows the
service contract; the models know nothing about who calls them.

## Composition Root

All object wiring happens in **one place** so the rest of the code never news-up
its own collaborators.

```13:48:src/app/Application.ts
export class Application {
  public static createParkingFacade(): ParkingFacade {
    const parkingLot = new ParkingLotBuilder("Forum Mall")
      .addFloor(1)
      .addCarSlots(10)
      // ...
      .build();

    const strategy = new FirstAvailableStrategy();

    const validator = new VehicleTypeValidator();
    validator
      .setNext(new ParkingLotOpenValidator())
      .setNext(new SlotCompatibilityValidator());

    const parkingService = new ParkingService(parkingLot, strategy, validator);
    parkingService.addObserver(new DisplayBoard());
    parkingService.addObserver(new Logger());
    parkingService.addObserver(new Analytics());

    const proxy = new ParkingProxy(parkingService);
    return new ParkingFacade(proxy);
  }
}
```

**Why:** the composition root is the only class allowed to know concrete
implementations. If tomorrow we swap `FirstAvailableStrategy` for
`NearestEntranceStrategy`, or add a caching proxy, we change this one method and
nothing else. This is manual **Dependency Injection**.

## Module map

| Module | Responsibility |
|--------|----------------|
| `app/` | Wire the object graph (composition root) |
| `parking/` | Core domain: lot, floors, slots, tickets, park/unpark |
| `vehicle/` | Vehicle hierarchy + creation |
| `billing/` | Charge calculation + add-on services |
| `shared/` | Cross-cutting enums and config helpers |
| `payment/` | Scaffolded for a future payment integration (empty) |
| `exercises/` | Learning scratch files (`.txt`, not compiled) |

## End-to-end flow (park a car)

```
main.ts
  └─ Application.createParkingFacade()          // build graph once
  └─ facade.parkVehicle(car)
       └─ ParkVehicleCommand.execute()          // Command
            └─ ParkingProxy.parkVehicle()        // gate/security checks
                 └─ ParkingService.parkVehicle()
                      ├─ validator.validate()     // Chain of Responsibility
                      ├─ strategy.findAvailableSlot()  // Strategy
                      ├─ slot.parkVehicle()        // State transition
                      ├─ notifyObservers()         // Observer
                      └─ return ParkingTicket
```

## End-to-end flow (unpark + bill)

```
facade.unparkVehicle(ticket)
  └─ UnparkVehicleCommand → Proxy → ParkingService.unparkVehicle()
       ├─ ticket.closeTicket()
       ├─ slot.unparkVehicle()   // State: Occupied → Available
       └─ notifyObservers()

billingService.calculate(ticket, [CAR_WASH, PREMIUM, EV])
  └─ new BaseParkingCharge(ticket)
  └─ DecoratorFactory.decorate(base, services)   // wrap with Decorators
  └─ charge.getAmount() / getDescription()
```

## Why this architecture for an LLD interview

- **Testable:** services take their dependencies via the constructor, so they
  can be unit-tested with fakes.
- **Extensible:** each pattern folder is an extension point (add a strategy,
  observer, validator, or decorator without touching existing code).
- **Readable:** a reviewer can find "how is billing done?" by opening `billing/`
  instead of hunting across a technical `services/` grab-bag.
- **Clear boundaries:** the Facade is the only supported way in, so the internal
  wiring can change freely.

## Honest gaps (worth calling out in an interview)

- `ParkingComposite` exists but `ParkingLot`/`ParkingFloor` do not extend it yet,
  so the Composite tree is only half-wired.
- `payment/` and several strategy/state/builder files are empty placeholders —
  they show *intended* extension points but are not implemented.
- Validators currently log instead of enforcing rules.
