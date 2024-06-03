import { GameStateType } from "./types";
import * as heuristic from "./heuristic";

const worker = new Worker(new URL("./alphabetaworker.ts", import.meta.url));

export async function makeMove(gameState: GameStateType) {
  return new Promise<GameStateType>((res) => {
    const possibleGameStates = heuristic.evaluatePossibleMoves(gameState);

    const gameStateValues = [];
    worker.onmessage = (e) => {
      const { gameState, value } = e.data;
      gameStateValues.push({ gameState, value });
      if (gameStateValues.length === possibleGameStates.length) {
        const highestValue = Math.max(
          ...gameStateValues.map(({ value }) => value),
        );
        const optimalMoves = gameStateValues
          // An optimal move is within 20 points from the "best" move,
          // to ensure the AI doesn't always pick the most optimal move
          .filter(({ value }) => highestValue - value <= 20)
          .map(({ gameState }) => gameState);
        const bestMove =
          optimalMoves[Math.floor(Math.random() * (optimalMoves.length - 1))];
        res(bestMove);
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
