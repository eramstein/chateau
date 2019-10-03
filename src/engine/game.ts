import { Character, setInitialCharacters, updateCharacter, updateCharacters } from "./characters";
import { Time, updateTime } from "./time";
import { createWorld, World, Position } from "./world";
import { Player } from "./player";

export interface GameState {
    camera: Camera,
    world: World;
    characters: { [key: string] : Character };
    time: Time;
    player: Player;
}

export interface Camera {
    position: Position;
    zoom: number;
}

export function initGameState(): GameState {
    const initPlayerPosition = { region: 'Chateau', x: 100, y: 100, z: 0 };

    const gameState: GameState = {
        camera: { position: initPlayerPosition, zoom: 1 },
        world: null,
        characters: {},
        player: { position: initPlayerPosition },
        time: {
            year: 1,
            season: 1,
            day: 1,
            hour: 12,
            minute: 0,
            second: 0,
        },
    };
    
    gameState.world = createWorld();
    setInitialCharacters(gameState);

    return gameState;
}
