export enum PlayerEnum {
  PLAYER_1,
  PLAYER_2,
}

export type TileType = PlayerEnum | undefined;

export type BoardType = TileType[][];

export interface PositionType {
  x: number;
  y: number;
}

export type MoveType = PositionType[];

export interface GameStateType {
  board: BoardType;
  currentPlayer: PlayerEnum;
  playerMoves: MoveType[];
}
