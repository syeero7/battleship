export default class GameController {
  #players;
  #activePlayer;
  #isGameOver;
  #winner;

  constructor() {
    this.#players = [];
    this.#activePlayer = null;
    this.#isGameOver = false;
    this.#winner = null;
  }

  setPlayer(player) {
    if (this.#players.length === 2) return;
    this.#players.push(player);
    this.#setActivePlayer(player);
  }

  #setActivePlayer(player) {
    if (this.#players.length > 1) return;
    this.#activePlayer = player;
  }

  #switchPlayerTurn() {
    this.#activePlayer =
      this.#activePlayer === this.#players[0] ? this.#players[1] : this.#players[0];
  }

  playTurn(position) {
    const opponent = this.#activePlayer === this.#players[0] ? this.#players[1] : this.#players[0];

    opponent.gameboard.receiveAttack(position);

    this.#setWinner(opponent.name);
    this.#setIsGameOver(this.#activePlayer.gameboard.isAllShipsSunk());
    this.#switchPlayerTurn();
  }

  #setWinner(name) {
    this.#winner = name;
  }

  #setIsGameOver(value) {
    this.#isGameOver = value;
  }

  get activePlayer() {
    return this.#activePlayer;
  }

  get winner() {
    if (this.#isGameOver) return this.#winner;
    return null;
  }

  get isGameOver() {
    return this.#isGameOver;
  }
}
