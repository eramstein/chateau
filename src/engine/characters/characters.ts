import { GameState } from '../model'

export function updateCharactersNeeds (gs: GameState) {
  gs.characters.forEach(character => {
    character.needs.hunger++
  })
}

export function updateCharactersHealth (gs: GameState) {
  gs.characters.forEach(character => {
    if (character.needs.hunger > 5000) character.health.alive = false
  })
}
