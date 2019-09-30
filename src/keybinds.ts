import { resetState, saveState, State, printState, tempTest } from "./stores";

export function handleKeyPress(event) {
    // s -> save
    if (event.charCode === 115) {
        saveState();
    }
    // l -> log state
    if (event.charCode === 108) {
        printState();
    }
    // t -> temp test
    if (event.charCode === 116) {
        tempTest();
    }
    // r -> reset
    if (event.charCode === 114) {
        resetState();
    }
}
