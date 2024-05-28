import * as game from "../common/game";
import { useEffect, useState } from "react";
import { PlayerEnum } from "../common/types";
import * as alphabeta from "../common/alphabeta";

export default function useGame() {
  const [gameState, setGameState] = useState(game.initialGame());
  const [botPlayer] = useState(
    Math.random() <= 0.5 ? PlayerEnum.PLAYER_1 : PlayerEnum.PLAYER_2,
  );

  const makeMove = (x: number, y: number) => {
    if (gameState.currentPlayer === botPlayer) {
      return;
    }
    const newGameState = game.makeMove(gameState, { x, y });
    if (!newGameState) {
      return;
    }
    setGameState(newGameState);
  };

  useEffect(() => {
    if (gameState.currentPlayer === botPlayer) {
      alphabeta.makeMove(gameState).then(setGameState);
    }
  }, [gameState]);

  return { gameState, botPlayer, makeMove };
}
