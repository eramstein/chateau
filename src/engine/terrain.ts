export enum GroundType {
    Dirt,
    Stone,
}

export enum SurfaceType {
    Grass,
    WoodenFloor,
}

export enum VolumeType {
    Stone,
    Metal,
}

export interface Tile {
    g: GroundType,
    s: SurfaceType | null,
    v: VolumeType | null,
    fi: number | null,
    i: number[],
    b: boolean,
    x: number,
    y: number,
    z: number,
}