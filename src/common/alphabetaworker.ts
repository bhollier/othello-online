import { GameStateType, PlayerEnum } from "./types";
import * as game from "./game";
import * as heuristic from "./heuristic";

const gameStateCache = new Map<number, number>();
let cacheMisses = 0;
let cacheHits = 0;

function alphaBeta(
  gameState: GameStateType,
  optimisingPlayer: PlayerEnum,
  depth: number,
  alpha: number,
  beta: number,
) {
  if (depth === 0 || gameState.playerMoves.length === 0) {
    return heuristic.evaluateState(
      gameState.board,
      game.otherPlayer(gameState.currentPlayer),
    );
  }

  const boardHash = game.boardHashCode(gameState.board);
  const cachedValue = gameStateCache.get(boardHash);
  if (cachedValue !== undefined) {
    cacheHits++;
    return cachedValue;
  } else {
    cacheMisses++;
  }

  const maximising = gameState.currentPlayer === optimisingPlayer;
  let value = maximising ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

  const possibleGameStates = heuristic.evaluatePossibleMoves(gameState);

  for (const newGameState of possibleGameStates) {
    const ret = alphaBeta(
      newGameState,
      optimisingPlayer,
      depth - 1,
      alpha,
      beta,
    );

    if (maximising) {
      value = Math.max(value, ret);
      if (value > beta) {
        break;
      }
      alpha = Math.max(alpha, value);
    } else {
      value = Math.min(value, ret);
      if (value < alpha) {
        break;
      }
      beta = Math.min(beta, value);
    }
  }

  gameStateCache.set(boardHash, value);

  return value;
}

onmessage = (e) => {
  const { gameState, optimisingPlayer } = e.data;

  cacheMisses = 0;
  cacheHits = 0;

  const value = alphaBeta(
    gameState,
    optimisingPlayer,
    8,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  );

  console.debug(
    JSON.stringify({ cacheHits, cacheMisses, cacheSize: gameStateCache.size }),
  );

  postMessage({ gameState, value });
};
