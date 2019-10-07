import { GameState } from "../engine/game";

export enum Screen {
    World = "WORLD",
    Region = "REGION",
}

export enum SelectionType {
    Tile = "TILE",
    Character = "CHARACTER",
    Item = "ITEM",
}

export interface Selection {
    type : SelectionType;
    id: any;
    data: any;
}

export interface UI {
    openScreen: Screen;
    screenParameters: any;
    selection: Selection;
}

export interface FullState {
    game: GameState;
    ui: UI;
}
