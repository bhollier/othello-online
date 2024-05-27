import * as game from "../common/game";
import { useState } from "react";

export default function useGame() {
  const [gameState, setGameState] = useState(game.initialGame());

  const makeMove = (x: number, y: number) => {
    const newGameState = game.makeMove(gameState, { x, y });
    if (!newGameState) {
      return;
    }
    setGameState(newGameState);
  };

  return { gameState, makeMove };
}
