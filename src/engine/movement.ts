import { GameState } from "./game";
import { Character } from "./characters";
import { Position } from "./world";
import { updateTime } from "./time";

export function setCharacterPosition(gs : GameState, characterName: string, position: Position) {
}

export function movePlayer(gs : GameState, direction: { x : number, y : number, z : number }) : GameState {
    const playerPos = gs.player.position;
    const region = gs.world.regions[playerPos.region];
    const width = region.tiles[0].length;
    const height = region.tiles[0][0].length;
    const targetTile = region.tiles[playerPos.z + direction.z][playerPos.x + direction.x][playerPos.y + direction.y];

    if (targetTile.b
        || gs.player.position.x === 0 && direction.x === -1
        || gs.player.position.x >= width -1 && direction.x === 1
        || gs.player.position.y >= height -1 && direction.y === 1
        || gs.player.position.y === 0 && direction.y === -1
        ) {
            return gs;
    }

    
    gs.player.position.x += direction.x;
    gs.player.position.y += direction.y;
    gs.player.position.z += direction.z;
    gs.camera.position = gs.player.position;

    gs.time = updateTime(gs.time, { second: 10 });

    return gs;
}