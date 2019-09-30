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
}

export interface Position {
    region: string;
    x: number;
    y: number;
    z: number;
}

const WORLD_SIZE = 5;
const REGION_SIZE = 5;

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
    };

    return region;
}