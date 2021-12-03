import { Character, GameState } from "../model";
import { setPriorityActivity } from "../objectives/activityPlans";

export function updateCharactersActivities(gs: GameState) {
  gs.characters.forEach((character) => {
    updateCharacterActivities(gs, character);
  });
}

function updateCharacterActivities(gs: GameState, character: Character) {
  if (!character.activity && character.priorityObjective) {
    setPriorityActivity(gs, character);
  }
}
