export interface GameState {
    places: Place[];
}

export interface Place {
    name: string;
    zones: Zone[];
}

export interface Zone {
    name: string;
}