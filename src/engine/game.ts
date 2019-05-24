import { Character, getInitialCharacters } from "./characters";
import { Time, updateTime } from "./time";
import { createWorld, World } from "./world";

export interface GameState {
    world: World;
    characters: Character[];
    time: Time;
}

export function nextGameState(gameState: GameState): GameState {

    gameState.time = updateTime(gameState.time);

    return gameState;
}

export function initGameState(): GameState {
    const gameState: GameState = {
        world: null,
        characters: [],
        time: {
            year: 1,
            season: 1,
            day: 1,
            hour: 12,
            minute: 0,
        },
    };

    gameState.characters = getInitialCharacters();
    gameState.world = createWorld();

    return gameState;
}
