import { resetState, saveState, State, printState, tempTest } from "./stores";

export function handleKeyPress(event) {

    switch(event.charCode) {
        case 115: // s -> save
        saveState();
        break;

        case 108: // l -> log state
        printState();
        break;

        case 116: // t -> temp test
        tempTest();
        break;

        case 114: // r -> reset
        resetState();
        break;

        case 52: // left (numpad 4)
        State.movePlayer({ x: -1, y: 0, z: 0 });
        break;

        case 54: // right (numpad 6)
        State.movePlayer({ x: 1, y: 0, z: 0 });
        break;

        case 56: // top (numpad 8)
        State.movePlayer({ x: 0, y: -1, z: 0 });
        break;

        case 50: // bottom (numpad 2)
        State.movePlayer({ x: 0, y: 1, z: 0 });
        break;

        case 55: // top left (numpad 7)
        State.movePlayer({ x: -1, y: -1, z: 0 });
        break;

        case 57: // top right (numpad 9)
        State.movePlayer({ x: 1, y: -1, z: 0 });
        break;

        case 51: // bottom right (numpad 3)
        State.movePlayer({ x: 1, y: 1, z: 0 });
        break;

        case 49: // bottom left (numpad 1)
        State.movePlayer({ x: -1, y: 1, z: 0 });
        break;
        
        default: return;
    }

    event.preventDefault();

}
