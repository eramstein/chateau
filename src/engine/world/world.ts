import { Pos, Tile, World } from "../model";

const WIDTH = 50;
const HEIGHT = 50;
const DEPTH = 1;

export function createWorld(): World {
  const tiles: Tile[][][] = [];

  for (let z = 0; z < DEPTH; z++) {
    const level: Tile[][] = [];
    for (let x = 0; x < WIDTH; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < HEIGHT; y++) {
        column.push({ pos: { x, y, z } });
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
