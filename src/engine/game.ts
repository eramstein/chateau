import { CHARACTERS } from "../data/characters";
import { CONTAINERS } from "../data/containers";
import { FOODS } from "../data/foods";
import { updateCharactersActivities } from "./activity/activity";
import {
  updateCharactersNeeds,
  updateCharactersHealth,
} from "./characters/characters";
import { makeItem } from "./items/items";
import { GameState } from "./model";
import { updateCharactersObjectives } from "./objectives/objectives";
import { CHECK_TIMERS, TICK_DURATION } from "./params";
import { updateTime } from "./time";
import { createWorld } from "./world/world";

export function initGameState(): GameState {
  const gameState: GameState = {
    world: null,
    characters: [CHARACTERS.Robert].map((c) => JSON.parse(JSON.stringify(c))),
    items: {},
    time: 0,
  };

  gameState.world = createWorld();

  [FOODS.Bread, CONTAINERS.WaterBottle].forEach((template, i) => {
    makeItem(gameState, i, { region: 0, place: 0, zone: 1 }, template);
  });

  return gameState;
}

export function runSimulation(gs: GameState, minutes: number) {
  const t0 = performance.now();

  for (let i = 0; i < minutes; i++) {
    updateCharactersNeeds(gs);
    updateCharactersHealth(gs);
    gs.time % CHECK_TIMERS.objectives === 0 && updateCharactersObjectives(gs);
    updateCharactersActivities(gs);
    gs.time = updateTime(gs.time, TICK_DURATION);
  }

  const t1 = performance.now();
  console.log("runSimulation", t1 - t0);
}
