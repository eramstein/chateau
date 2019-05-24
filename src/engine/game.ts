import { World, createWorld } from "./world";
import { Time, updateTime } from "./time";

export interface GameState {
    world: World;
    time: Time;
}

export function nextGameState(gameState : GameState): GameState {
    
    gameState.time = updateTime(gameState.time)
        
    return gameState
}

export function initGameState(): GameState {
    let gameState : GameState = {
        world: null,
        time: {
            year: 1,
            season: 1,
            day: 1,
            hour: 12,
            minute: 0,
        },
    }

    gameState.world = createWorld()
    
    return gameState
}