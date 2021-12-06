import { isDrinkable } from "../items/drinks";
import { findClosestItem } from "../items/items";
import {
  ActivityType,
  Character,
  Container,
  GameState,
  ObjectiveType,
} from "../model";
import { clearPriorityObjective } from "../objectives/objectives";
import { ADD_OBJECTIVE_THRESHOLDS } from "../params";
import { isSamePosition } from "../world/world";

export function setDrinkActivity(gs: GameState, character: Character) {
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

export function doDrink(gs: GameState, character: Character) {
  const item = gs.items[character.activity.targetItemId] as Container;
  // 1 unit of volume quenches 1 unit of thirst
  const ratioToDrink = character.needs.vital.thirst / item.volume;
  if (ratioToDrink > item.fillRatio) {
    character.needs.vital.thirst -= Math.floor(item.volume * item.fillRatio);
    item.fillRatio = 0;
  } else {
    character.needs.vital.thirst = 0;
    item.fillRatio -= ratioToDrink;
  }
  character.activity = null;
  if (
    character.needs.vital.thirst < ADD_OBJECTIVE_THRESHOLDS.thirst &&
    character.priorityObjective.type === ObjectiveType.Drink
  ) {
    clearPriorityObjective(character);
  }
}
