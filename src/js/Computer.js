import { getPossiblePositions, generateRandomPosition, removeAdjacentSlots } from "./game.js";

class Computer {
  #boardSize;
  #positions;
  #adjacentSlots;
  #attackOrientation;
  #lastAttack;
  #hitPositions;
  #playerShipCount;
  #directions;

  constructor() {
    this.#boardSize = 10;
    this.#positions = getPossiblePositions(this.#boardSize);
    this.#adjacentSlots = [];
    this.#hitPositions = [];
    this.#attackOrientation = null;
    this.#lastAttack = { isHit: null, position: null };
    this.#playerShipCount = { previous: null, current: null };
    this.#directions = [
      ["vertical", [-1, 0]],
      ["vertical", [1, 0]],
      ["horizontal", [0, -1]],
      ["horizontal", [0, 1]],
    ];
  }

  set isLastAttackHit(value) {
    this.#lastAttack.isHit = value;
  }

  set playersCurrentShipCount(value) {
    this.#playerShipCount.previous = this.#playerShipCount.current;
    this.#playerShipCount.current = value;
  }

  get target() {
    if (this.#lastAttack.isHit) {
      this.#hitPositions.push(this.#lastAttack.position);
      this.#findAdjacentSlots();
    }

    if (this.#isPlayerShipSunk()) {
      this.#removeAdjacentSlots();
      this.#resetTarget();
    }

    if (this.#hitPositions.length > 1) this.#setAttackOrientation();

    if (this.#adjacentSlots.length) return this.#targetAdjacentSlot();

    return this.#targetRandomSlot();
  }

  reset() {
    this.#positions = getPossiblePositions(this.#boardSize);
    this.#lastAttack = { isHit: null, position: null };
    this.#playerShipCount = { previous: null, current: null };
    this.#resetTarget();
  }

  #targetRandomSlot() {
    const [y, x] = generateRandomPosition(this.#positions);
    this.#deletePosition(y, x);
    this.#setLastAttackPosition(y, x);

    return [y, x];
  }

  #targetAdjacentSlot() {
    let [y, x] = this.#adjacentSlots[0][1];

    for (let i = 0; i < this.#adjacentSlots.length; i++) {
      if (!this.#attackOrientation) break;

      if (this.#adjacentSlots[i][0] === this.#attackOrientation) {
        [y, x] = this.#adjacentSlots[i][1];
        this.#adjacentSlots = this.#adjacentSlots.slice(i);
        break;
      }
    }

    this.#deletePosition(y, x);
    this.#setLastAttackPosition(y, x);

    return this.#adjacentSlots.shift()[1];
  }

  #resetTarget() {
    this.#attackOrientation = null;
    this.#hitPositions = [];
    this.#adjacentSlots = [];
  }

  #deletePosition(y, x) {
    this.#positions.delete(`${y}, ${x}`);
  }

  #removeAdjacentSlots() {
    for (const position of this.#hitPositions) removeAdjacentSlots(this.#positions, position);
  }

  #setAttackOrientation() {
    const [y1, x1] = this.#hitPositions[0];
    const [y2, x2] = this.#hitPositions[1];

    for (const [orientation, [dy, dx]] of this.#directions) {
      if (y1 - y2 === dy || x1 - x2 === dx) {
        this.#attackOrientation = orientation;

        break;
      }
    }
  }

  #isPlayerShipSunk() {
    return this.#playerShipCount.previous > this.#playerShipCount.current;
  }

  #setLastAttackPosition(y, x) {
    this.#lastAttack.position = [y, x];
  }

  #findAdjacentSlots() {
    const [y, x] = this.#lastAttack.position;

    for (const [orientation, [dy, dx]] of this.#directions)
      if (this.#positions.has(`${y + dy}, ${x + dx}`))
        this.#adjacentSlots.push([orientation, [y + dy, x + dx]]);
  }
}

const computer = new Computer();
export default computer;
