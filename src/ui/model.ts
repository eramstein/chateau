import { GameState } from "../engine/model";

export enum Screen {
  World = "WORLD",
  Region = "REGION",
  Characters = "CHARACTERS",
  Items = "ITEMS",
}

export enum SelectionType {
  Tile = "TILE",
  Character = "CHARACTER",
  Item = "ITEM",
}

export enum SimSpeed {
  S0 = 0,
  S1 = 1, // min
  S2 = 60, // hour
  S3 = 1440, // day
}

export interface Selection {
  type: SelectionType;
  id: any;
  data: any;
}

export interface UI {
  openScreen: Screen;
  screenParameters: any;
  selection: Selection;
  simSpeed: SimSpeed;
}

export interface FullState {
  game: GameState;
  ui: UI;
}
