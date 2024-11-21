export default class Gameboard {
  #board;
  #isShipHit;

  constructor() {
    this.#board = this.#initGameBoard();
    this.#isShipHit = null;
    this.ships = [];
  }

  #initGameBoard() {
    const length = 10;
    return new Array(length).fill().map(() => new Array(length).fill("empty"));
  }

  placeShip(ship, positions) {
    if (positions.some(([y, x]) => this.#board[y][x] !== "empty")) return;

    positions.forEach(([y, x]) => (this.#board[y][x] = ship.class));
    this.ships.push(ship);
  }

  receiveAttack(position) {
    const [y, x] = position;

    if (this.#board[y][x] === "empty") {
      this.#board[y][x] = "miss";
      this.#isShipHit = false;
      return;
    }

    for (const ship of this.ships) {
      if (this.#board[y][x] === ship.class) {
        const hit = `!${ship.class}`;

        this.#board[y][x] = hit;
        this.#isShipHit = true;

        ship.hit();
      }
    }
  }

  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  get isShipHit() {
    return this.#isShipHit;
  }

  get board() {
    return this.#board;
  }
}
