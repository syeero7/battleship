import { getPossiblePositions, generateRandomPosition } from "./game";

export default class Computer {
  #boardSize;
  #positions;
  constructor() {
    this.#boardSize = 10;
    this.#positions = getPossiblePositions(this.#boardSize);
  }

  get target() {
    return this.#targetRandomSlot();
  }

  #targetRandomSlot() {
    const [y, x] = generateRandomPosition(this.#positions);
    this.#deletePosition(y, x);

    return [y, x];
  }

  #deletePosition(y, x) {
    this.#positions.delete(`${y}, ${x}`);
  }
}
