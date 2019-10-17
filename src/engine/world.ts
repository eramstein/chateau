import { GameState } from "./game";
import { Character } from "./characters";
import { Tile, GroundType, SurfaceType } from "./terrain";
import { pickRandom } from "./random";

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
    tiles: Tile[][][];
}

export interface Position {
    region: string;
    x: number;
    y: number;
    z: number;
}

const WORLD_SIZE = 5;
const REGION_SIZE = 1000;

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
    const tiles = makeTiles(type, REGION_SIZE, REGION_SIZE, 1);

    const region: Region = {
        type,
        name: regionName,
        description,
        tiles,
    };

    return region;
}

function makeTiles(regionType: RegionType, width : number, height : number, depth : number) : Tile[][][] {
    let tiles = [];
    for (let z = 0; z < depth; z++) {
        tiles[z] = [];
        for (let x = 0; x < width; x++) {
            tiles[z][x] = [];
            for (let y = 0; y < height; y++) {
                const tile : Tile = {
                    g: pickRandom([GroundType.Dirt, GroundType.Stone]),
                    s: pickRandom([SurfaceType.Grass, null]),
                    v: null,
                    fi: null,
                    b: false,
                    i: [],
                    x,
                    y,
                    z,
                };
                tile.b = tile.g === GroundType.Stone;
                tiles[z][x][y] = tile;            
            }        
        }
    }
    return tiles;
}