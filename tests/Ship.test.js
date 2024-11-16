import Ship from "../src/js/Ship";

let ship;

beforeEach(() => (ship = new Ship(5)));

test("ship has been hit", () => {
  ship.hit();
  ship.hit();

  expect(ship.hits).toBe(2);
});

test("is ship sunk", () => {
  for (let i = 0; i < ship.size; i++) ship.hit();

  expect(ship.isSunk()).toBe(true);
});
