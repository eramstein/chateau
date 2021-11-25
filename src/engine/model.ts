/* eslint-disable no-use-before-define */

export interface GameState {
    world: World;
    characters: { [key: string] : Character };
    time: Date;
}

export interface World {
    regions: { [key: string] : Region };
}

export interface Region {
    name: string;
    description: string;
    places: Place[];
}

export interface Place {
    name: string;
    description: string;
    places: Zone[];
}

export interface Zone {
    name: string;
    description: string;
}

export interface Character {
    name: string;
}
