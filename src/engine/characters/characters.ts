import { Character, GameState } from "../model";

export function updateCharactersNeeds(gs: GameState) {
  gs.characters.forEach((character) => {
    character.needs.vital.hunger++;
    character.needs.vital.thirst++;
    character.needs.vital.sleep++;
  });
}

export function updateCharactersHealth(gs: GameState) {
  gs.characters.forEach((character) => {
    if (character.needs.vital.hunger > 5000) character.health.alive = false;
    if (character.needs.vital.thirst > 2500) character.health.alive = false;
  });
}
