import {
  BoardType,
  GameStateType,
  PlayerEnum,
  PositionType,
  TileType,
} from "./types";

function initialBoard() {
  const board = Array.from(Array(8).values()).map(() =>
    Array.from(Array(8).values()).map(() => ({}) as TileType),
  ) as BoardType;
  board[8 / 2 - 1][8 / 2] = { claimed: PlayerEnum.PLAYER_1 };
  board[8 / 2][8 / 2 - 1] = { claimed: PlayerEnum.PLAYER_1 };
  board[8 / 2 - 1][8 / 2 - 1] = { claimed: PlayerEnum.PLAYER_2 };
  board[8 / 2][8 / 2] = { claimed: PlayerEnum.PLAYER_2 };
  return board;
}

export function otherPlayer(player: PlayerEnum) {
  if (player === PlayerEnum.PLAYER_1) return PlayerEnum.PLAYER_2;
  return PlayerEnum.PLAYER_1;
}

function possibleMoves(board: BoardType, player: PlayerEnum) {
  const takeTilesInDirection = (
    startX: number,
    startY: number,
    xDir: number,
    yDir: number,
  ) => {
    const tiles = [{ x: startX, y: startY }] as { x: number; y: number }[];
    let x = startX + xDir;
    let y = startY + yDir;
    if (x < 0 || x >= 8 || y < 0 || y >= 8) return [];
    if (board[y][x].claimed !== otherPlayer(player)) return [];
    while (board[y][x].claimed === otherPlayer(player)) {
      tiles.push({ x, y });
      x += xDir;
      y += yDir;
      if (x < 0 || x >= 8 || y < 0 || y >= 8) {
        return [];
      }
    }
    if (tiles.length === 1) {
      return [];
    }
    if (board[y][x].claimed !== player) {
      return [];
    }
    return tiles;
  };

  return board
    .flatMap((row, y) => row.map((tile, x) => ({ tile, x, y })))
    .filter(({ tile }) => tile.claimed === undefined)
    .map(({ x, y }) =>
      [
        takeTilesInDirection(x, y, 1, 0),
        takeTilesInDirection(x, y, -1, 0),
        takeTilesInDirection(x, y, 0, 1),
        takeTilesInDirection(x, y, 0, -1),
        takeTilesInDirection(x, y, 1, 1),
        takeTilesInDirection(x, y, -1, -1),
        takeTilesInDirection(x, y, 1, -1),
        takeTilesInDirection(x, y, -1, 1),
      ].flatMap((tiles) => tiles),
    )
    .filter((tiles) => tiles.length > 0);
}

export function boardHashCode(board: BoardType) {
  const number = board
    .flatMap((row) => row)
    .map((tile) => `${tile.claimed ? tile.claimed + 1 : 0}`)
    .join("");
  return parseInt(number, 3);
}

export function playerScores(board: BoardType) {
  return board
    .flatMap((row) => row)
    .filter((tile) => tile.claimed !== undefined)
    .reduce(
      (acc, tile) => {
        acc[tile.claimed]++;
        return acc;
      },
      { [PlayerEnum.PLAYER_1]: 0, [PlayerEnum.PLAYER_2]: 0 },
    );
}

export function initialGame() {
  const board = initialBoard();
  return {
    board: board,
    currentPlayer: PlayerEnum.PLAYER_1,
    playerMoves: possibleMoves(board, PlayerEnum.PLAYER_1),
  } as GameStateType;
}

export function makeMove(gameState: GameStateType, pos: PositionType) {
  const move = gameState.playerMoves.find(
    (move) => move[0].x === pos.x && move[0].y === pos.y,
  );
  if (!move) {
    return undefined;
  }
  const newBoard = gameState.board.map((row, y) =>
    row.map((tile, x) => {
      if (move.find((taken) => taken.x === x && taken.y === y)) {
        return { claimed: gameState.currentPlayer };
      } else {
        return tile;
      }
    }),
  );
  const newPlayer = otherPlayer(gameState.currentPlayer);
  return {
    board: newBoard,
    currentPlayer: newPlayer,
    playerMoves: possibleMoves(newBoard, newPlayer),
  } as GameStateType;
}
