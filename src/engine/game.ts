import { World, createWorld } from "./world";

export interface GameState {
    world: World;
}

export function initGameState(): GameState {
    let gameState : GameState = {
        world: null,
    }

    gameState = createWorld(gameState)
    
    return gameState
}