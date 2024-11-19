import Gameboard from "../src/js/Gameboard";

describe("placeShip()", () => {
  const gameboard = new Gameboard();
  const ship = { class: "battleship" };

  test("given position matches the class of ship if the ship has been placed", () => {
    const positions = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];

    gameboard.placeShip(ship, positions);

    for (const [y, x] of positions) expect(gameboard.board[y][x]).toEqual(ship.class);
  });

  test("returns undefined if the given position is not empty", () => {
    const positions = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];

    expect(gameboard.placeShip(ship, positions)).toBeUndefined();
  });
});

describe("receiveAttack()", () => {
  const gameboard = new Gameboard();
  const ship = { class: "submarine", hit: jest.fn() };
  const positions = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  gameboard.placeShip(ship, positions);

  test("given position is equal to miss if a ship wasn't hit by the attack", () => {
    const position = [1, 0];
    gameboard.receiveAttack(position);

    expect(gameboard.board[position[0]][position[1]]).toEqual("miss");
  });

  test("given position is equal to !ship class if a ship was hit by the attack", () => {
    const position = [0, 2];
    gameboard.receiveAttack(position);

    expect(gameboard.board[position[0]][position[1]]).toEqual(`!${ship.class}`);
  });
});

describe("isAllShipsSunk()", () => {
  const gameboard = new Gameboard();
  const ships = {
    destroyer: { class: "destroyer", isSunk: jest.fn(() => true) },
    submarine: { class: "submarine", isSunk: jest.fn(() => true) },
  };
  const positions = {
    destroyer: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    submarine: [
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  };
  gameboard.placeShip(ships.destroyer, positions.destroyer);

  test("returns true if all ships have been sunk", () => {
    gameboard.placeShip(ships.submarine, positions.submarine);

    expect(gameboard.isAllShipsSunk()).toBe(true);
  });

  test("returns false if not all ships have been sunk", () => {
    ships.submarine.isSunk = jest.fn(() => false);
    gameboard.placeShip(ships.submarine, positions.submarine);

    expect(gameboard.isAllShipsSunk()).toBe(false);
  });
});
