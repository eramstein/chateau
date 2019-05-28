import { GameState } from "./game";
import { Character } from "./characters";

enum RegionType {
    Castle,
    Plains,
}

export interface World {
    name: string;
    regions: { [key: string] : Region };
}

export interface Region {
    name: string;
    type: RegionType;
    description: string;
    places: { [key: string] : Place };
}

export interface Place {
    name: string;
    region: string;
    description: string;
    zones: { [key: string] : Zone };
}

export interface Zone {
    name: string;
    region: string;
    place: string;
    description: string;
    characters: string[];
}

export interface Position {
    region: string;
    place: string;
    zone: string;
}

const WORLD_SIZE = 5;
const REGION_SIZE = 5;
const PLACE_SIZE = 5;

export function createWorld(): World {
    const world: World = {
        name: "Le nouveau monde",
        regions: {},
    };

    for (let index = 0; index < WORLD_SIZE; index++) {
        const newRegion = createRegion(world);
        world.regions[newRegion.name] = newRegion;
    }

    return world;
}

export function createRegion(world: World): Region {

    const type = Object.values(world.regions).length === 0 ? RegionType.Castle : RegionType.Plains;
    const regionName = type === RegionType.Castle ? "Chateau" : "Région " + (Object.values(world.regions).length);
    const description = type === RegionType.Castle ? "Une vieille ruine qu'elle est toute pourrie" : "Bla bla bla";

    const region: Region = {
        type,
        name: regionName,
        description,
        places: {},
    };

    for (let index = 0; index < REGION_SIZE; index++) {
        const newPlace = createPlace(region);
        region.places[newPlace.name] = newPlace;
    }

    return region;
}

export function createPlace(region: Region): Place {
    const place: Place = {
        name: region.name + " Endroit " + (Object.values(region.places).length + 1),
        region: region.name,
        description: "bla bla bla",
        zones: {},
    };

    for (let index = 0; index < PLACE_SIZE; index++) {
        const newZone = createZone(place);
        place.zones[newZone.name] = newZone;
    }

    return place;
}

export function createZone(place: Place): Zone {
    const zone: Zone = {
        name: "La Zone " + (Object.values(place.zones).length + 1),
        region: place.region,
        place: place.name,
        description: "bla bla bla",
        characters: [],
    };

    return zone;
}

export function getCastlePosition(world: World): Position {    
    const region = Object.values(world.regions)[0];
    const place = Object.values(region.places)[0];
    const zone =  Object.values(place.zones)[0];
    return {
        region: region.name,
        place: place.name,
        zone: zone.name,
    };
}