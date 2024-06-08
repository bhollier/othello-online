import { GameStateType, PlayerEnum } from "../common/types";
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import * as game from "../common/game";

interface PlayerScoreProps {
  player: PlayerEnum;
  score: number;
  currentPlayer: PlayerEnum;
  botPlayer: PlayerEnum;
}

function PlayerScore({
  player,
  score,
  currentPlayer,
  botPlayer,
}: PlayerScoreProps) {
  return (
    <Flex w="100%" h={32} justifyContent="center" alignItems="center">
      <Text
        w={16}
        h={16}
        rounded="100%"
        align="center"
        bg={player === PlayerEnum.PLAYER_1 ? "black" : "white"}
        color={player === PlayerEnum.PLAYER_1 ? "white" : "black"}
      >
        {score}
        <p></p>
        {player === botPlayer && currentPlayer === botPlayer && <Spinner />}
      </Text>
    </Flex>
  );
}

interface BoardProps {
  gameState: GameStateType;
  botPlayer: PlayerEnum;
  onClick: (x: number, y: number) => void;
}

export default function Board({ gameState, botPlayer, onClick }: BoardProps) {
  const scores = game.playerScores(gameState.board);

  return (
    <VStack>
      <SimpleGrid columns={2} w="100%">
        <PlayerScore
          player={PlayerEnum.PLAYER_1}
          score={scores[PlayerEnum.PLAYER_1]}
          currentPlayer={gameState.currentPlayer}
          botPlayer={botPlayer}
        />
        <PlayerScore
          player={PlayerEnum.PLAYER_2}
          score={scores[PlayerEnum.PLAYER_2]}
          currentPlayer={gameState.currentPlayer}
          botPlayer={botPlayer}
        />
      </SimpleGrid>
      <VStack bg="black" spacing={1}>
        {gameState.board.map((column, y) => (
          <HStack key={y} spacing={1}>
            {column.map((tile, x) => (
              <Box
                key={x}
                w={16}
                h={16}
                bg={
                  gameState.currentPlayer !== botPlayer &&
                  gameState.playerMoves.find(
                    ([move]) => move.x === x && move.y === y,
                  )
                    ? "limegreen"
                    : "green"
                }
                onClick={() => onClick(x, y)}
              >
                {tile === PlayerEnum.PLAYER_1 && (
                  <Box w={16} h={16} rounded="100%" bg="black"></Box>
                )}
                {tile === PlayerEnum.PLAYER_2 && (
                  <Box w={16} h={16} rounded="100%" bg="white"></Box>
                )}
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
