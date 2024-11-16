import Gameboard from "../src/js/Gameboard";

describe("place a ship", () => {
  const gameboard = new Gameboard();
  const ship = { class: "battleship" };

  test("can place a ship", () => {
    const positions = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];

    gameboard.placeShip(ship, positions);

    for (const [y, x] of positions) expect(gameboard.board[y][x]).toEqual(ship.class);
  });

  test("can't place a ship", () => {
    const positions = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];

    expect(gameboard.placeShip(ship, positions)).toBeUndefined();
  });
});

describe("receive an attack", () => {
  const gameboard = new Gameboard();
  const ship = { class: "test", hit: jest.fn() };
  const positions = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  gameboard.placeShip(ship, positions);

  test("attack didn't hit", () => {
    const position = [1, 0];
    gameboard.receiveAttack(position);

    expect(gameboard.board[position[0]][position[1]]).toEqual("miss");
  });

  test("attack hit a ship", () => {
    const position = [0, 2];
    gameboard.receiveAttack(position);

    expect(gameboard.board[position[0]][position[1]]).toEqual(`!${ship.class}`);
  });
});

describe("is all ships sunk", () => {
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

  test("is all ships have been sunk", () => {
    gameboard.placeShip(ships.submarine, positions.submarine);

    expect(gameboard.isAllShipsSunk()).toBe(true);
  });

  test("isn't every ship has sunk", () => {
    ships.submarine.isSunk = jest.fn(() => false);
    gameboard.placeShip(ships.submarine, positions.submarine);

    expect(gameboard.isAllShipsSunk()).toBe(false);
  });
});
