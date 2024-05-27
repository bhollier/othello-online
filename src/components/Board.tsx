import { BoardType, PlayerEnum } from "../common/types";
import { Box, HStack, VStack } from "@chakra-ui/react";
import * as React from "react";

interface BoardProps {
  board: BoardType;
  onClick: (x: number, y: number) => void;
}

export default function Board({ board, onClick }: BoardProps) {
  return (
    <VStack bg="black" spacing={1}>
      {board.map((column, y) => (
        <HStack key={y} spacing={1}>
          {column.map((tile, x) => (
            <Box key={x} w={16} h={16} bg="green" onClick={() => onClick(x, y)}>
              {tile.claimed === PlayerEnum.PLAYER_1 && (
                <Box w={16} h={16} rounded="100%" bg="black"></Box>
              )}
              {tile.claimed === PlayerEnum.PLAYER_2 && (
                <Box w={16} h={16} rounded="100%" bg="white"></Box>
              )}
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
