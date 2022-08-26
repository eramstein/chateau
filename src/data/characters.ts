import { ActivityType, Character, ObjectiveType } from "../engine/model";

const DEFAULTS: Character = {
  name: "Mr Default",
  pos: {
    x: 0,
    y: 0,
    z: 0,
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
  activity: { type: ActivityType.Idle, objectiveId: "" },
  priorityObjective: { type: ObjectiveType.None, id: "" },
};

export const CHARACTERS: { [key: string]: Character } = {
  Robert: {
    ...DEFAULTS,
    name: "Robert",
  },
};
