import { findClosestItem } from "../items/items";
import {
  ActivityType,
  Character,
  Food,
  GameState,
  Item,
  ItemType,
  ObjectiveType,
} from "../model";
import { clearPriorityObjective } from "../objectives/objectives";
import { ADD_OBJECTIVE_THRESHOLDS } from "../params";
import { isSamePos } from "../world/world";
import { idleCharacter } from "./activity";

export function setEatActivity(gs: GameState, character: Character) {
  const closestEat = findClosestItem(
    gs,
    character.pos,
    (i: Item) => i.type === ItemType.Food
  );
  if (!closestEat) return;
  const isInZone = isSamePos(closestEat.pos, character.pos);
  if (isInZone) {
    character.activity = {
      type: ActivityType.Consume,
      targetItemId: closestEat.id,
      objectiveId: character.priorityObjective.id,
      doneRatio: 0,
    };
  } else {
    character.activity = {
      type: ActivityType.Move,
      targetPos: closestEat.pos,
      objectiveId: character.priorityObjective.id,
      doneRatio: 0,
    };
  }
}

export function doEat(gs: GameState, character: Character) {
  if (!character.activity.targetItemId) return;
  const item = gs.items[character.activity.targetItemId] as Food;
  // 1 calory equals 1 unit of hunger
  character.needs.vital.hunger = Math.max(
    0,
    character.needs.vital.hunger - item.calories
  );
  delete gs.items[character.activity.targetItemId];
  idleCharacter(character);
  if (
    character.needs.vital.hunger < ADD_OBJECTIVE_THRESHOLDS.hunger &&
    character.priorityObjective.type === ObjectiveType.Eat
  ) {
    clearPriorityObjective(gs, character);
  }
}
