import { resetState, saveState, printState } from './stores'

export function handleKeyPress (event) {
  switch (event.charCode) {
    case 115: // s -> save
      saveState()
      break

    case 108: // l -> log state
      printState()
      break

    case 114: // r -> reset
      resetState()
      break

    default: return
  }

  event.preventDefault()
}
