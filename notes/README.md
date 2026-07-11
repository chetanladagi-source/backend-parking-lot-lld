# Parking Lot LLD — Design Notes

These notes explain the design of the code under [`../src`](../src). They are written
for interview revision: each concept is defined, then mapped to the **exact file**
in this project where it lives, with a short "why we used it here".

## Index

| Note | What it covers |
|------|----------------|
| [architecture-pattern.md](./architecture-pattern.md) | Layering, module boundaries, and end-to-end request flow |
| [design-patterns.md](./design-patterns.md) | Every GoF pattern used (Singleton, Builder, Factory, Strategy, State, Observer, Chain of Responsibility, Command, Facade, Proxy, Composite, Decorator) |
| [solid-principles.md](./solid-principles.md) | SRP, OCP, LSP, ISP, DIP with file references |
| [oops-concepts.md](./oops-concepts.md) | Abstraction, Encapsulation, Inheritance, Polymorphism |
| [kiss-dry-yagni.md](./kiss-dry-yagni.md) | KISS, DRY (and YAGNI as a bonus) |
| [law-of-demeter.md](./law-of-demeter.md) | Law of Demeter (principle of least knowledge) |

## The one-paragraph summary

A client (`main.ts`) asks a **Facade** to park a vehicle. The Facade wraps each
call in a **Command** and forwards it to a **Proxy** that does gate/security checks
before delegating to the real `ParkingService`. The service validates the request
through a **Chain of Responsibility** of validators, picks a slot using a pluggable
**Strategy**, flips the slot through its **State** machine, and fans out events to
**Observers**. The `ParkingLot` itself is a **Singleton** assembled by a fluent
**Builder**, and vehicles come from a **Factory**. When the car leaves, a
`BillingService` builds a base charge and wraps it with **Decorators** (car wash, EV,
premium) chosen by a small **Factory**. That is 12 patterns collaborating end to end.

## The domain in one picture

```
ParkingLot (Singleton)
 └── ParkingFloor
      └── ParkingSlot (State: Available/Occupied)
           └── Vehicle (Car/Bike/Truck)

ParkVehicle request:
  main → Facade → Command → Proxy → ParkingService
                                       ├── Validator chain
                                       ├── Strategy (find slot)
                                       ├── Slot state transition
                                       └── Observers (Logger/Display/Analytics)
                                       → ParkingTicket

Billing:
  Ticket → BaseParkingCharge → [Decorators] → final amount
```
