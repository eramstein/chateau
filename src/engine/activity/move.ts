import { GameState, Character } from "../model";
import { TICK_DURATION } from "../params";

export function doMove(gs: GameState, character: Character) {
  const source = character.pos;
  const destination = character.activity.targetPos;

  // TODO: set pathfinding
}
