export const shipInfo = [
  { class: "Carrier", size: 5 },
  { class: "Battleship", size: 4 },
  { class: "Destroyer", size: 3 },
  { class: "Submarine", size: 3 },
  { class: "Patrol Boat", size: 2 },
];

export function placeShipsRandom(gameboard, ships) {
  const boardSize = 10;
  const positions = generatePositions(boardSize, ships);

  for (let i = 0; i < Object.keys(positions).length; i++) {
    const position = Object.values(positions);

    gameboard.placeShip(ships[i], position[i]);
  }
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

function removeAdjacentCells(availablePositions, position) {
  const adjacentCells = getAdjacentCells(availablePositions, position);

  for (const [y, x] of adjacentCells) availablePositions.delete(`${y}, ${x}`);
}

function getAdjacentCells(availablePositions, position) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const adjacentCells = [];

  for (const direction of directions) {
    const [y, x] = [direction[0] + position[0], direction[1] + position[1]];

    if (availablePositions.has(`${y}, ${x}`)) adjacentCells.push([y, x]);
  }

  return adjacentCells;
}

function generatePositions(boardSize, ships) {
  const availablePositions = getPossiblePositions(boardSize);
  const positions = {}; // positions for all ships

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

    for (const [y, x] of shipPositions) removeAdjacentCells(availablePositions, [y, x]);

    positions[ship.class] = shipPositions;
  }

  return positions;
}
