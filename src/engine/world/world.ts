import { REGIONS } from "../../data/regions";
import { World } from "../model";

export function createWorld(): World {
  const world: World = {
    regions: [REGIONS.Village],
  };
  return world;
}
