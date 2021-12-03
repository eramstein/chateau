import { ObjectiveType } from "./model";

export const ADD_OBJECTIVE_THRESHOLDS = {
  thirst: 100,
  hunger: 50,
  sleep: 100,
};

export const CHECK_TIMERS = {
  objectives: 60,
};

export const OBJECTIVE_PRIORITY = {
  [ObjectiveType.Drink]: 0,
  [ObjectiveType.Eat]: 100,
};
