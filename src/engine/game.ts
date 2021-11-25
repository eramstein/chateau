import { GameState } from './model'
import { updateTime } from './time'
import { createWorld } from './world'

export function initGameState (): GameState {
  const gameState: GameState = {
    world: null,
    characters: {},
    time: new Date(1408, 0, 1)
  }

  gameState.world = createWorld()

  return gameState
}

export function runSimulation (gs: GameState, seconds: number) {
  const t0 = performance.now()
  gs.time = updateTime(gs.time, seconds)
  const t1 = performance.now()
  console.log('runSimulation', (t1 - t0))
}
