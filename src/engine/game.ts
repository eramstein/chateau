import { Character, setInitialCharacters, updateCharacter, updateCharacters } from "./characters";
import { Time, updateTime } from "./time";
import { createWorld, World } from "./world";

export interface GameState {
    world: World;
    characters: { [key: string] : Character };
    time: Time;
}

export function nextGameState(gs: GameState): GameState {

    gs.time = updateTime(gs.time);

    updateCharacters(gs);

    return gs;
}

export function initGameState(): GameState {
    const gameState: GameState = {
        world: null,
        characters: {},
        time: {
            year: 1,
            season: 1,
            day: 1,
            hour: 12,
            minute: 0,
        },
    };
    
    gameState.world = createWorld();
    setInitialCharacters(gameState);

    return gameState;
}
