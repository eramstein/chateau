import { Character } from '../engine/model'

const DEFAULTS: Character = {
  name: 'Mr Default',
  needs: {
    hunger: 0
  },
  health: {
    alive: true
  }
}

export const CHARACTERS : { [key: string] : Character } = {
  Robert: {
    ...DEFAULTS,
    name: 'Robert'
  }
}
