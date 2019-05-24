import { GameState } from "./game";

export interface World {
    name: string;
    regions: Region[];
}

export interface Region {
    name: string;
    description: string;
    places: Place[];
}

export interface Place {
    name: string;
    description: string;
    zones: Zone[];
}

export interface Zone {
    name: string;
    description: string;
}

const WORLD_SIZE = 5;
const REGION_SIZE = 5;
const PLACE_SIZE = 5;

export function createWorld(): World {
    const world : World = {
        name: "Le nouveau monde",
        regions: [],
    }
    
    for (let index = 0; index < WORLD_SIZE; index++) {
        const newRegion = createRegion(world);
        world.regions.push(newRegion);
    }

    return world
}

export function createRegion(world : World): Region {
    const region : Region = {
        name: "Région " + (world.regions.length + 1),
        description: "bla bla bla",
        places: [],
    }

    for (let index = 0; index < REGION_SIZE; index++) {
        const newPlace = createPlace(region);
        region.places.push(newPlace);
    }
    
    return region
}

export function createPlace(region : Region): Place {
    const place : Place = {
        name: "Endroit " + (region.places.length + 1),
        description: "bla bla bla",
        zones: [],
    }

    for (let index = 0; index < PLACE_SIZE; index++) {
        const newZone = createZone(place);
        place.zones.push(newZone);
    }
    
    return place
}

export function createZone(place : Place): Zone {
    const zone : Zone = {
        name: "La Zone " + (place.zones.length + 1),
        description: "bla bla bla",
    }
    
    return zone
}