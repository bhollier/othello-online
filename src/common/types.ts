export enum PlayerEnum {
  PLAYER_1,
  PLAYER_2,
}

export interface TileType {
  claimed: PlayerEnum | undefined;
}

export type BoardType = TileType[][];

export interface PositionType {
  x: number;
  y: number;
}

export type Move = PositionType[];

export interface GameStateType {
  board: BoardType;
  currentPlayer: PlayerEnum;
  playerMoves: Move[];
}
