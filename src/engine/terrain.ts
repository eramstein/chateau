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
    ground: GroundType,
    surface: SurfaceType | null,
    volume: VolumeType | null,
    filledByItem: number | null,
    items: number[],
    impassable: boolean,
    x: number,
    y: number,
    z: number,
}