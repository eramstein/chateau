import { Character, GameState, ObjectiveType } from "../model";
import { ADD_OBJECTIVE_THRESHOLDS, OBJECTIVE_PRIORITY } from "../params";

function hasOfType(character: Character, type: ObjectiveType) {
  return character.objectives.filter((o) => o.type === type).length > 0;
}

export function updateCharactersObjectives(gs: GameState) {
  gs.characters.forEach((character) => {
    updateCharacterObjectives(gs, character);
  });
}

export function updateCharacterObjectives(gs: GameState, character: Character) {
  addCharacterObjectives(gs, character);
  setPriorityObjective(gs, character);
}

export function clearPriorityObjective(character: Character) {
  character.priorityObjective.type = null;
  character.objectives = character.objectives.filter(
    (o) => o.id !== character.priorityObjective.id
  );
}

function addCharacterObjectives(gs: GameState, character: Character) {
  // VITAL NEEDS
  if (
    character.needs.vital.thirst > ADD_OBJECTIVE_THRESHOLDS.thirst &&
    !hasOfType(character, ObjectiveType.Drink)
  ) {
    character.objectives.push({
      id: "o_drink",
      type: ObjectiveType.Drink,
    });
  }
  if (
    character.needs.vital.hunger > ADD_OBJECTIVE_THRESHOLDS.hunger &&
    !hasOfType(character, ObjectiveType.Eat)
  ) {
    character.objectives.push({
      id: "o_eat",
      type: ObjectiveType.Eat,
    });
  }
}

function setPriorityObjective(gs: GameState, character: Character) {
  if (character.objectives.length === 0) return;
  character.priorityObjective = character.objectives.sort((o1, o2) => {
    return OBJECTIVE_PRIORITY[o1.type] - OBJECTIVE_PRIORITY[o2.type];
  })[0];
}
