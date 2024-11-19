import { getPossiblePositions, generateRandomPosition } from "./game";

export default class Computer {
  #positions;
  constructor() {
    this.#positions = getPossiblePositions();
  }

  get target() {
    return this.#targetRandomSlot();
  }

  #targetRandomSlot() {
    const [y, x] = generateRandomPosition();
    this.#deletePosition(y, x);

    return [y, x];
  }

  #deletePosition(y, x) {
    this.#positions.delete(`${y}, ${x}`);
  }
}
