import { GameState, Item, Place, Position, Region, Zone } from "../model";
import { getPlace, getZone } from "../world/world";

export function getNewItemId(gs: GameState) {
  const ids = Object.keys(gs.items).map((k) => +k);
  const newId = (ids.length > 0 ? ids[ids.length - 1] : 0) + 1;
  return newId;
}

export function makeItem(
  gs: GameState,
  id: number,
  position: Position,
  template: Item
) {
  const item = {
    ...template,
    id,
    position,
  };
  gs.items[id] = item;
  gs.world.regions[position.region].places[position.place].zones[
    position.zone
  ].items.push(id);
}

export function findItemsInRegion(
  gs: GameState,
  region: Region,
  filterFn
): Item[] {
  const items: Item[] = [];
  region.places.forEach((place) => {
    place.zones.forEach((zone) => {
      zone.items.forEach((item) => {
        if (filterFn(gs.items[item])) {
          items.push(gs.items[item]);
        }
      });
    });
  });
  return items;
}

export function findItemsInPlace(
  gs: GameState,
  place: Place,
  filterFn
): Item[] {
  const items: Item[] = [];
  place.zones.forEach((zone) => {
    zone.items.forEach((item) => {
      if (filterFn(gs.items[item])) {
        items.push(gs.items[item]);
      }
    });
  });
  return items;
}

export function findItemsInZone(gs: GameState, zone: Zone, filterFn): Item[] {
  const items: Item[] = [];
  zone.items.forEach((item) => {
    if (filterFn(gs.items[item])) {
      items.push(gs.items[item]);
    }
  });
  return items;
}

export function findClosestItem(
  gs: GameState,
  position: Position,
  filterFn
): Item {
  const zone = getZone(gs.world, position);
  const inZone = findItemsInZone(gs, zone, filterFn);
  if (inZone.length > 0) {
    return inZone[0];
  }
  const place = getPlace(gs.world, position);
  const inPlace = findItemsInPlace(gs, place, filterFn);
  if (inPlace.length > 0) {
    return inPlace[0];
  }
  const region = gs.world.regions[position.region];
  const inRegion = findItemsInRegion(gs, region, filterFn);
  if (inRegion.length > 0) {
    return inRegion[0];
  }
  return null;
}
