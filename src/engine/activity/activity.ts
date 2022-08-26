import { ActivityType, Character, GameState, ObjectiveType } from "../model";
import { doDrink, setDrinkActivity } from "./drink";
import { doEat, setEatActivity } from "./eat";
import { doMove } from "./move";

export function updateCharactersActivities(gs: GameState) {
  gs.characters.forEach((character) => {
    updateCharacterActivities(gs, character);
  });
}

function updateCharacterActivities(gs: GameState, character: Character) {
  if (!character.activity && character.priorityObjective) {
    setPriorityActivity(gs, character);
  }
  if (character.activity && character.priorityObjective) {
    doActivity(gs, character);
  }
}

function setPriorityActivity(gs: GameState, character: Character) {
  switch (character.priorityObjective.type) {
    case ObjectiveType.Drink:
      setDrinkActivity(gs, character);
      break;
    case ObjectiveType.Eat:
      setEatActivity(gs, character);
      break;

    default:
      break;
  }
}

function doActivity(gs: GameState, character: Character) {
  switch (character.activity.type) {
    case ActivityType.Consume:
      if (character.priorityObjective.type === ObjectiveType.Drink) {
        doDrink(gs, character);
      }
      if (character.priorityObjective.type === ObjectiveType.Eat) {
        doEat(gs, character);
      }
      break;
    case ActivityType.Move:
      doMove(gs, character);
      break;

    default:
      break;
  }
}

export function idleCharacter(character: Character) {
  character.activity = { type: ActivityType.Idle, objectiveId: "Do Nothing" };
}
