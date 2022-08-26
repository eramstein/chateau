import { GameState, Item, Pos } from "../model";
import { getPlace, getZone } from "../world/world";

export function getNewItemId(gs: GameState) {
  const ids = Object.keys(gs.items).map((k) => +k);
  const newId = (ids.length > 0 ? ids[ids.length - 1] : 0) + 1;
  return newId;
}

export function makeItem(gs: GameState, id: number, pos: Pos, template: Item) {
  const item = {
    ...template,
    id,
    pos,
  };
  gs.items[id] = item;
}

export function findClosestItem(gs: GameState, pos: Pos, filterFn): Item {
  // TODO
  return gs.items[0];
}
