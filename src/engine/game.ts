import { CHARACTERS } from "../data/characters";
import { FOODS } from "../data/foods";
import {
  updateCharactersNeeds,
  updateCharactersHealth,
} from "./characters/characters";
import { makeItem } from "./items/items";
import { GameState } from "./model";
import { updateTime } from "./time";
import { createWorld } from "./world/world";

export function initGameState(): GameState {
  const gameState: GameState = {
    world: null,
    characters: [CHARACTERS.Robert],
    items: {},
    time: 0,
  };

  gameState.world = createWorld();

  const initItems = [FOODS.Bread].map((template) =>
    makeItem(gameState, { region: 0, place: 0, zone: 0 }, template)
  );
  initItems.forEach((item) => {
    gameState.items[item.id] = item;
  });

  return gameState;
}

export function runSimulation(gs: GameState, minutes: number) {
  const t0 = performance.now();

  for (let i = 0; i < minutes; i++) {
    updateCharactersNeeds(gs);
    updateCharactersHealth(gs);
    gs.time = updateTime(gs.time, 1);
  }

  const t1 = performance.now();
  console.log("runSimulation", t1 - t0);
}
