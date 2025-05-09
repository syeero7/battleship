import Gameboard from "../src/js/Gameboard";

describe("placeShip()", () => {
  const gameBoard = new Gameboard();
  const ship = { class: "battleship" };

  it("should match the given position if the ship has been placed", () => {
    const positions = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];

    gameBoard.placeShip(ship, positions);

    for (const [y, x] of positions) expect(gameBoard.board[y][x]).toEqual(ship.class);
  });

  it("should return undefined if the given position is not empty", () => {
    const positions = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];

    expect(gameBoard.placeShip(ship, positions)).toBeUndefined();
  });
});

describe("receiveAttack()", () => {
  const gameBoard = new Gameboard();
  const ship = { class: "submarine", hit: jest.fn() };
  const positions = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  gameBoard.placeShip(ship, positions);

  it("should equal to miss if a ship wasn't hit by the attack", () => {
    const position = [1, 0];
    gameBoard.receiveAttack(position);

    expect(gameBoard.board[position[0]][position[1]]).toEqual("miss");
  });

  it("should equal to !ship class if a ship was hit by the attack", () => {
    const position = [0, 2];
    gameBoard.receiveAttack(position);

    expect(gameBoard.board[position[0]][position[1]]).toEqual(`!${ship.class}`);
  });
});

describe("isAllShipsSunk()", () => {
  const gameBoard = new Gameboard();
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
  gameBoard.placeShip(ships.destroyer, positions.destroyer);

  it("should return true if all ships sunk", () => {
    gameBoard.placeShip(ships.submarine, positions.submarine);

    expect(gameBoard.isAllShipsSunk()).toBe(true);
  });

  it("should return false if not all ships sunk", () => {
    ships.submarine.isSunk = jest.fn(() => false);
    gameBoard.placeShip(ships.submarine, positions.submarine);

    expect(gameBoard.isAllShipsSunk()).toBe(false);
  });
});
