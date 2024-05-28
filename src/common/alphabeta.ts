import { GameStateType } from "./types";
import * as heuristic from "./heuristic";

const worker = new Worker(new URL("./alphabetaworker.ts", import.meta.url));

export async function makeMove(gameState: GameStateType) {
  return new Promise((res) => {
    let bestGameState: GameStateType;
    let bestGameStateValue = Number.MIN_SAFE_INTEGER;

    const possibleGameStates = heuristic.evaluatePossibleMoves(gameState);

    let processedGames = 0;
    worker.onmessage = (e) => {
      const { gameState, value } = e.data;
      if (value > bestGameStateValue) {
        bestGameStateValue = value;
        bestGameState = gameState;
      }
      processedGames++;
      if (processedGames === possibleGameStates.length) {
        res(bestGameState);
      }
    };

    for (const newGameState of possibleGameStates) {
      worker.postMessage({
        gameState: newGameState,
        optimisingPlayer: gameState.currentPlayer,
      });
    }
  });
}
