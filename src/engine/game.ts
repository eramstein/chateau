import { CHARACTERS } from '../data/characters'
import { updateCharactersNeeds, updateCharactersHealth } from './characters/characters'
import { GameState } from './model'
import { updateTime } from './time'
import { createWorld } from './world/world'

export function initGameState (): GameState {
  const gameState: GameState = {
    world: null,
    characters: [CHARACTERS.Robert],
    time: 0
  }

  gameState.world = createWorld()

  return gameState
}

export function runSimulation (gs: GameState, minutes: number) {
  const t0 = performance.now()

  for (let i = 0; i < minutes; i++) {
    updateCharactersNeeds(gs)
    updateCharactersHealth(gs)
    gs.time = updateTime(gs.time, 1)
  }

  const t1 = performance.now()
  console.log('runSimulation', (t1 - t0))
}
