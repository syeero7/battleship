import GameController from "./GameController.js";
import Gameboard from "./Gameboard.js";
import Computer from "./Computer.js";
import Player from "./Player.js";
import Ship from "./Ship.js";

export const shipInfo = [
  { class: "Carrier", size: 5 },
  { class: "Battleship", size: 4 },
  { class: "Destroyer", size: 3 },
  { class: "Submarine", size: 3 },
  { class: "Patrol Boat", size: 2 },
];
export const gameController = new GameController();
export const computerPlayer = new Computer();
export const playerBoards = { player: initGameboard(), computer: initGameboard() };

placeShipsRandom(playerBoards.player, createShips(shipInfo));
placeShipsRandom(playerBoards.computer, createShips(shipInfo));

function initPlayer(name, gameboard) {
  return new Player(name, gameboard);
}

export function initGameboard() {
  return new Gameboard();
}

export function createShips(shipInfo) {
  return shipInfo.map((ship) => new Ship(ship.size, ship.class));
}

export function setPlayers() {
  const player = initPlayer("player", playerBoards.player);
  const computer = initPlayer("computer", playerBoards.computer);

  gameController.setPlayer(player);
  gameController.setPlayer(computer);
  playerBoards.player = null;
  playerBoards.computer = null;
}

export function placeShipsRandom(gameboard, ships) {
  const boardSize = 10;
  const positions = generatePositions(boardSize, ships);

  for (let i = 0; i < positions.length; i++) gameboard.placeShip(ships[i], positions[i]);
}

export function getPossiblePositions(boardSize) {
  const map = new Map();

  for (let i = 0; i < boardSize * boardSize; i++) {
    const [y, x] = [i % boardSize, Math.floor(i / boardSize)];
    map.set(`${y}, ${x}`, [y, x]);
  }

  return map;
}

export function generateRandomPosition(availablePositions) {
  const values = Array.from(availablePositions.values());
  return values[Math.floor(Math.random() * values.length)];
}

function getRandomStartingPosition(availablePositions, shipSize, boardSize) {
  let y, x;

  do {
    [y, x] = generateRandomPosition(availablePositions);
    if (y + shipSize > boardSize || x + shipSize > boardSize) continue;
  } while (
    !availablePositions.has(`${y + shipSize}, ${x}`) ||
    !availablePositions.has(`${y}, ${x + shipSize}`)
  );

  return [y, x];
}

function removeAdjacentSlots(availablePositions, position) {
  const adjacentSlots = getAdjacentSlots(availablePositions, position);

  for (const [y, x] of adjacentSlots) availablePositions.delete(`${y}, ${x}`);
}

function getAdjacentSlots(availablePositions, position) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const adjacentSlots = [];

  for (const direction of directions) {
    const [y, x] = [direction[0] + position[0], direction[1] + position[1]];

    if (availablePositions.has(`${y}, ${x}`)) adjacentSlots.push([y, x]);
  }

  return adjacentSlots;
}

function generatePositions(boardSize, ships) {
  const availablePositions = getPossiblePositions(boardSize);
  const positions = []; // positions for all ships

  for (const ship of ships) {
    const shipPositions = [];
    const [y, x] = getRandomStartingPosition(availablePositions, ship.size, boardSize);

    for (let i = 0; i < ship.size; i++) {
      if (y < x) {
        shipPositions.push([y, x + i]);
        availablePositions.delete(`${y}, ${x + i}`);
      } else {
        shipPositions.push([y + i, x]);
        availablePositions.delete(`${y + i}, ${x}`);
      }
    }

    for (const [y, x] of shipPositions) removeAdjacentSlots(availablePositions, [y, x]);

    positions.push(shipPositions);
  }

  return positions;
}
