import { BoardType, GameStateType, PlayerEnum } from "./types";
import * as game from "./game";

const TABLE_HEURISTIC_SCORES = [
  [100, -25, 10, 5, 5, 10, -25, 100],
  [-25, -25, 2, 2, 2, 2, -25, -25],
  [10, 2, 5, 1, 1, 5, 2, 10],
  [5, 2, 1, 2, 2, 1, 2, 5],
  [5, 2, 1, 2, 2, 1, 2, 5],
  [10, 2, 5, 1, 1, 5, 2, 10],
  [-25, -25, 2, 2, 2, 2, -25, -25],
  [100, -25, 10, 5, 5, 10, -25, 100],
];

export function evaluateState(board: BoardType, optimisingPlayer: PlayerEnum) {
  return board
    .map((row, y) => ({ row, y }))
    .reduce(
      (acc, { row, y }) =>
        acc +
        row
          .filter((tile) => tile.claimed !== undefined)
          .map((tile, x) => {
            const tileValue = TABLE_HEURISTIC_SCORES[y][x];
            if (tile.claimed === optimisingPlayer) {
              return tileValue;
            }
            return tileValue * -1;
          })
          .reduce((l, r) => l + r, 0),
      0,
    );
}

export function evaluatePossibleMoves(gameState: GameStateType) {
  return gameState.playerMoves
    .map((move) => game.makeMove(gameState, move[0]))
    .sort(
      (l, r) =>
        evaluateState(r.board, gameState.currentPlayer) -
        evaluateState(l.board, gameState.currentPlayer),
    );
}
