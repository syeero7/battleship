import computer from "../src/js/Computer.js";

test("return adjacent slot if a ship is hit", () => {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const [y, x] = computer.target;
  computer.isLastAttackHit = true;

  const adjacentSlots = directions.map(([dy, dx]) => [dy + y, dx + x]);

  expect(adjacentSlots).toContainEqual(computer.target);
});
