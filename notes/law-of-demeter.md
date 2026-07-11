# Law of Demeter (Principle of Least Knowledge)

## Definition

The **Law of Demeter (LoD)** says a method should only talk to its *immediate
friends*, not to strangers reached by chaining through other objects. A method `m`
of object `O` may only call methods of:

1. `O` itself,
2. `O`'s own fields (its direct collaborators),
3. objects passed in as parameters to `m`,
4. objects `m` creates itself.

The anti-pattern it forbids is the **train wreck**:
`a.getB().getC().getD().doSomething()`. The more you reach through, the more
coupling you create to structures you don't own.

Rule of thumb: **"Tell, don't ask."** Ask an object to *do* something rather than
pulling out its internals and doing the work yourself.

---

## Where this codebase follows LoD

### 1. The service tells the slot to park — it doesn't reach inside

`ParkingService` doesn't do `slot.getState().setVehicle(...).setState(...)`.
It just tells the slot, and the slot delegates internally:

```12:24:src/parking/services/ParkingService.ts
  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    this.validator.validate(vehicle, this.parkingLot);
    const slot = this.parkingStrategy.findAvailableSlot(this.parkingLot, vehicle);
    if (!slot) { throw new Error("Parking Lot Full"); }
    slot.parkVehicle(vehicle);   // tell, don't ask
    this.notifyObservers(slot);
    return new ParkingTicket(randomUUID(), vehicle, slot);
  }
```

The service talks only to its friends: its injected `validator`, `parkingStrategy`,
`parkingLot`, the `slot` it was handed by the strategy, and observers it owns.

### 2. Slot delegates to its state instead of exposing it

`ParkingSlot.parkVehicle` forwards to the state object rather than letting callers
manipulate the state machine:

```25:33:src/parking/models/ParkingSlot.ts
  public parkVehicle(vehicle: Vehicle): void {
    this.state.park(this, vehicle);
  }
  public unparkVehicle(): void {
    this.state.unpark(this);
  }
```

Callers never see or touch `state` — that's least knowledge in action.

### 3. Facade delegates, callers stay shallow

`main.ts` calls `facade.parkVehicle(car)`. It never navigates
`facade.getService().getProxy().getValidator()...`. The Facade is precisely a
LoD-friendly boundary:

```9:14:src/parking/facade/ParkingFacade.ts
  public parkVehicle(vehicle: Vehicle): ParkingTicket {
    const command = new ParkVehicleCommand(this.parkingOperations, vehicle);
    return command.execute();
  }
```

### 4. Billing asks the ticket for a computed value, not its raw fields

`BaseParkingCharge` asks the ticket for the already-computed duration instead of
grabbing `entryTime`/`exitTime` and doing date math itself:

```8:12:src/billing/models/BaseParkingCharge.ts
  getAmount(): number {
    const hours = Math.ceil(this.ticket.getParkingDurationInMinutes() / 60);
    return hours * 20;
  }
```

The knowledge of "how duration is calculated" stays inside `ParkingTicket`:

```12:18:src/parking/models/ParkingTicket.ts
  public getParkingDurationInMinutes(): number {
    const endTime = this.exitTime ?? new Date();
    const duration = endTime.getTime() - this.entryTime.getTime();
    return Math.ceil(duration / (1000 * 60));
  }
```

This is the cleanest LoD example in the repo: billing depends on *what* (a
duration) not *how* (date arithmetic on internal fields).

---

## Where the code bends the rule (be honest in an interview)

Two spots reach one level deeper than strict LoD likes:

- **Strategy walks the lot structure:**
  `floor.getAvailableSlot()` inside a loop over `parkingLot.getAllFloors()`.

```9:15:src/parking/strategies/FirstAvailableStrategy.ts
        for (const floor of parkingLot.getAllFloors()) {
            const slot = floor.getAvailableSlot();
            if (slot) { return slot; }
        }
```

- **`main.ts` prints `ticket.getParkingSlot().getSlotNumber()`** — a two-hop chain.

These are acceptable because:
1. They chain over **collections/queries**, not to trigger side effects.
2. Each hop returns a first-class domain object with its own clean interface (not
   an exposed primitive/internal field).

A stricter design would add `parkingLot.findFirstAvailableSlot()` so the strategy
asks the lot directly. That's a reasonable refactor to mention.

---

## Why LoD matters

- **Loose coupling:** callers don't depend on the internal shape of objects they
  don't own, so those internals can change freely.
- **Encapsulation stays intact:** "tell, don't ask" keeps behavior next to the
  data it operates on (see `ParkingTicket.getParkingDurationInMinutes`).
- **Fewer ripple effects:** if `ParkingSlot` changed how it stores state, no
  external caller breaks, because none of them reach into it.
