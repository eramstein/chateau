/* eslint-disable no-use-before-define, no-unused-vars */

import { GameState } from '../engine/model'

export enum Screen {
    World = 'WORLD',
    Region = 'REGION',
}

export enum SelectionType {
    Tile = 'TILE',
    Character = 'CHARACTER',
    Item = 'ITEM',
}

export enum SimSpeed {
    S0 = 0,
    S1 = 60, // sec
    S2 = 3600, // hour
    S3 = 86400, // day
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
    simSpeed: SimSpeed;
}

export interface FullState {
    game: GameState;
    ui: UI;
}
