import { GameState, Item, Position } from "../model";

export function makeItem(gs: GameState, position: Position, template: Item) {
  const ids = Object.keys(gs.items).map((k) => +k);
  const newId = (ids.length > 0 ? ids[ids.length - 1] : 0) + 1;
  return {
    ...template,
    id: newId,
    position,
  };
}
