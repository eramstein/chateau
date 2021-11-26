/* eslint-disable no-use-before-define */

export interface GameState {
    world: World;
    characters: Character[];
    time: number; // minutes passed since T0
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
    needs: Needs;
    health: Health;
}

export interface Needs {
    hunger: number;
}

export interface Health {
    alive: boolean;
}
