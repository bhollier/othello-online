import * as React from "react";
import useGame from "../hooks/useGame";
import Board from "./Board";

export default function App() {
  const { gameState, makeMove } = useGame();

  return <Board board={gameState.board} onClick={makeMove} />;
}
