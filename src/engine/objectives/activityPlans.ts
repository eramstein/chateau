import { isDrinkable } from "../items/drinks";
import { findClosestItem } from "../items/items";
import { ActivityType, Character, GameState, ObjectiveType } from "../model";
import { isSamePosition } from "../world/world";

export function setPriorityActivity(gs: GameState, character: Character) {
  switch (character.priorityObjective.type) {
    case ObjectiveType.Drink:
      setDrinkActivity(gs, character);
      break;

    default:
      break;
  }
}

function setDrinkActivity(gs: GameState, character: Character) {
  const closestDrink = findClosestItem(gs, character.position, isDrinkable);
  if (!closestDrink) return;
  const isInZone = isSamePosition(closestDrink.position, character.position);
  if (isInZone) {
    character.activity = {
      type: ActivityType.Consume,
      targetItemId: closestDrink.id,
      objectiveId: character.priorityObjective.id,
    };
  } else {
    character.activity = {
      type: ActivityType.Move,
      targetPosition: closestDrink.position,
      objectiveId: character.priorityObjective.id,
    };
  }
}
