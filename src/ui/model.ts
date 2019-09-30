import { GameState } from "../engine/game";

export enum Screen {
    World = "WORLD",
    Region = "REGION",
}

export interface UI {
    openScreen: Screen;
    screenParameters: any;
}

export interface FullState {
    game: GameState;
    ui: UI;
}
