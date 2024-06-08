import * as React from "react";
import useGame from "../hooks/useGame";
import Board from "./Board";
import { Flex } from "@chakra-ui/react";

export default function App() {
  const { gameState, botPlayer, makeMove } = useGame();

  return (
    <Flex w="100vw" h="100vh" bg="dimgrey" justifyContent="center">
      <Board gameState={gameState} botPlayer={botPlayer} onClick={makeMove} />
    </Flex>
  );
}
