import { REGIONS } from "../../data/regions";
import { Place, Position, World, Zone } from "../model";

export function createWorld(): World {
  const world: World = {
    regions: [REGIONS.Village].map((r) => JSON.parse(JSON.stringify(r))),
  };
  return world;
}

export function isSamePosition(pos1: Position, pos2: Position): boolean {
  return (
    pos1.region === pos2.region &&
    pos1.place === pos2.place &&
    pos1.zone === pos2.zone
  );
}

export function getZone(world: World, position: Position): Zone {
  return world.regions[position.region].places[position.place].zones[
    position.zone
  ];
}

export function getPlace(world: World, position: Position): Place {
  return world.regions[position.region].places[position.place];
}
