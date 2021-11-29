import { GameState, Item, Position } from "../model";

export function getNewItemId(gs: GameState) {
  const ids = Object.keys(gs.items).map((k) => +k);
  const newId = (ids.length > 0 ? ids[ids.length - 1] : 0) + 1;
  return newId;
}

export function makeItem(id: number, position: Position, template: Item) {
  return {
    ...template,
    id,
    position,
  };
}
