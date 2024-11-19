import Ship from "../src/js/Ship";

let ship;

beforeEach(() => (ship = new Ship(5)));

test("increase the hits value by 1 when the ship is hit", () => {
  ship.hit();
  ship.hit();

  expect(ship.hits).toBe(2);
});

test("returns true if the ship has been sunk", () => {
  for (let i = 0; i < ship.size; i++) ship.hit();

  expect(ship.isSunk()).toBe(true);
});
