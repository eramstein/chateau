import { Character } from "../engine/model";

const DEFAULTS: Character = {
  name: "Mr Default",
  position: {
    region: 0,
    place: 0,
    zone: 0,
  },
  needs: {
    hunger: 0,
    thirst: 0,
  },
  health: {
    alive: true,
  },
};

export const CHARACTERS: { [key: string]: Character } = {
  Robert: {
    ...DEFAULTS,
    name: "Robert",
  },
};
