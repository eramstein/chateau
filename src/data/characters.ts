import { Character } from "../engine/model";

const DEFAULTS: Character = {
  name: "Mr Default",
  position: {
    region: 0,
    place: 0,
    zone: 0,
  },
  needs: {
    vital: {
      hunger: 0,
      thirst: 0,
      sleep: 0,
    },
    confort: {},
    security: {},
    relational: {},
    social: {},
  },
  health: {
    alive: true,
  },
  objectives: [],
  activity: null,
  priorityObjective: null,
};

export const CHARACTERS: { [key: string]: Character } = {
  Robert: {
    ...DEFAULTS,
    name: "Robert",
  },
};
