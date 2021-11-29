import { GameState } from "../model";

export function updateCharactersNeeds(gs: GameState) {
  gs.characters.forEach((character) => {
    character.needs.hunger++;
    character.needs.thirst++;
  });
}

export function updateCharactersHealth(gs: GameState) {
  gs.characters.forEach((character) => {
    if (character.needs.hunger > 5000) character.health.alive = false;
    if (character.needs.thirst > 2500) character.health.alive = false;
  });
}
