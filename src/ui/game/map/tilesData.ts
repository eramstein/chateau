import { SurfaceType, GroundType } from "../../../engine/terrain";

export const SURFACE_TILES = {
    [SurfaceType.Grass]: '#eeffee',
    [SurfaceType.WoodenFloor]: '#ffffee',
};

export const GROUND_TILES = {
    [GroundType.Dirt]: '#eeaaaa',
    [GroundType.Stone]: '#ccc',
};

export const PLAYER_SYMBOL = '@';