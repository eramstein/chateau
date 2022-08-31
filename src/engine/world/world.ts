import { Pos, TerrainType, Tile, World } from "../model";

const WIDTH = 60;
const HEIGHT = 60;
const DEPTH = 1;

export function createWorld(): World {
  const tiles: Tile[][][] = [];

  for (let z = 0; z < DEPTH; z++) {
    const level: Tile[][] = [];
    for (let x = 0; x < WIDTH; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < HEIGHT; y++) {
        column.push({
          pos: { x, y, z },
          terrain: Math.random() > 0.2 ? TerrainType.Grass : TerrainType.Rock,
        });
      }
      level.push(column);
    }
    tiles.push(level);
  }
  return {
    tiles,
  };
}

export function isSamePos(pos1: Pos, pos2: Pos): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y && pos1.z === pos2.z;
}
