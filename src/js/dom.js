import computer from "./Computer.js";
import {
  gameController,
  playerBoards,
  setPlayers,
  initGameboard,
  placeShipsRandom,
  createShips,
  shipInfo,
} from "./game.js";

renderGameboard(playerBoards.player, "player");

export function buttonClickHandler(e) {
  if (e.target.type !== "button") return;

  const dataset = Object.keys(e.target.dataset)[0];

  if (dataset === "start") startGame();
  if (dataset === "shuffle") shuffle();
  if (dataset === "restart") restart();
}

export function boardClickHandler(e) {
  if (!e.target.matches(".slot") || gameController.activePlayer.name !== "player") return;

  const position = e.target.dataset.position;

  playerAction(position.split(""));
  if (gameController.isGameOver) displayWinner(gameController.winner);
  computerAction();
  if (gameController.isGameOver) displayWinner(gameController.winner);
}

function shuffle() {
  playerBoards.player = initGameboard();
  placeShipsRandom(playerBoards.player, createShips(shipInfo));
  removeChildElements(document.querySelector(".player"));
  renderGameboard(playerBoards.player, "player");
}

function startGame() {
  renderGameboard(playerBoards.computer, "computer");
  setPlayers();

  toggleHideClass("#buttons"); // add
  toggleHideClass("#computerBoard"); // remove
}

function restart() {
  gameController.reset();
  computer.reset();

  toggleHideClass(".popup"); // add
  toggleHideClass("#computerBoard"); // add

  playerBoards.player = initGameboard();
  playerBoards.computer = initGameboard();
  placeShipsRandom(playerBoards.player, createShips(shipInfo));
  placeShipsRandom(playerBoards.computer, createShips(shipInfo));

  removeChildElements(document.querySelector("#playerBoard"));
  removeChildElements(document.querySelector("#computerBoard"));

  renderGameboard(playerBoards.player, "player");
}

function renderGameboard(gameboard, player) {
  const slots = createGameboardElements(gameboard, player);
  document.querySelector(`.${player}`).appendChild(slots);
}

function createGameboardElements(gameboard, player) {
  const fragment = document.createDocumentFragment();
  // i, j = index number
  gameboard.board.forEach((slots, i) =>
    slots.forEach((slot, j) => {
      slot = slot.toLowerCase().replace(" ", "-");

      const div = document.createElement("div");

      div.dataset.position = `${i}${j}`;
      if (slot[0] === "!") div.classList.add("hit");
      else div.classList.add(slot, player, "slot");

      fragment.appendChild(div);
    }),
  );

  return fragment;
}

function removeChildElements(parentElement) {
  while (parentElement.firstChild) parentElement.firstChild.remove();
}

function playerAction(position) {
  gameController.playTurn(position);

  removeChildElements(document.querySelector("#computerBoard"));
  renderGameboard(gameController.activePlayer.gameboard, "computer");
}

function computerAction() {
  gameController.playTurn(computer.target);
  computer.isLastAttackHit = gameController.activePlayer.gameboard.isShipHit;
  computer.playersCurrentShipCount = gameController.activePlayer.gameboard.remainingShips;

  removeChildElements(document.querySelector("#playerBoard"));
  renderGameboard(gameController.activePlayer.gameboard, "player");
}

function displayWinner(winner) {
  toggleHideClass("#buttons"); // remove
  toggleHideClass(".popup"); // remove
  document.querySelector(".winner").textContent = winner;
}

function toggleHideClass(element) {
  document.querySelector(element).classList.toggle("hide");
}
