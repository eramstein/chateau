import { get, writable } from "svelte/store";
import { GameState, initGameState, nextGameState } from "./engine/game";
import { handleKeyPress } from "./keybinds";

export enum Screen {
    World = "WORLD",
    Region = "REGION",
}

export interface UI {
    openScreen: Screen;
    screenParameters: any;
    timeSpeed: number;
    pause: boolean;
}

export interface FullState {
    game: GameState;
    ui: UI;
}

const TICK_TIME = 1000;
let STOP = false;

export const State = createFullState();

function createFullState() {
    const initialState = getSavedState();

    const { subscribe, set, update } = writable(initialState, function start(set) {
        function nextState(ms) {
            setTimeout(() => {
                const state = get(State);
                const t0 = performance.now();
                const next = state.ui.pause ? state.game : nextGameState(state.game);
                const t1 = performance.now();
                const refreshTarget = TICK_TIME / state.ui.timeSpeed;
                const refreshMs = Math.max(0, refreshTarget - (t1 - t0));
                set({
                    game: next,
                    ui: state.ui,
                });
                if (!STOP) {
                    nextState(refreshMs);
                }
            }, ms);
        }

        nextState(TICK_TIME);

        return function stop() {
            STOP = true;
        };
    });

    return {
        subscribe,
        initialize: () => set(getNewState()),

        // UI actions
        updateSpeed: diff => update(s => { s.ui.timeSpeed = Math.max(1, Math.min(10, s.ui.timeSpeed + diff)); return s; }),
        togglePause: () => update(s => { s.ui.pause = !s.ui.pause; return s; }),
        openWorld: () => update(s => { s.ui.openScreen = Screen.World; return s; }),
        openRegion: regionName => update(s => { s.ui.openScreen = Screen.Region; s.ui.screenParameters = { region: regionName }; return s; }),

        // Gameplay actions
        // addZone: zoneID => update(gs => spawnZone(gs, zoneID)),
    };
}

function getNewState(): FullState {
    return {
        game: initGameState(),
        ui: {
            openScreen: Screen.World,
            screenParameters: null,
            timeSpeed: 1,
            pause: false,
        },
    };
}

function getSavedState(): FullState {
    const savedData = localStorage.getItem("castleSavedGame") || "nope";
    if (savedData === "nope") {
        return getNewState();
    } else {
        const parsedData = JSON.parse(savedData);
        return parsedData;
    }
}

export function saveState() {
    const savedData = get(State);
    localStorage.setItem("castleSavedGame", JSON.stringify(savedData));
}

export function resetState() {
    State.initialize();
    saveState();
}

window.onbeforeunload = () => {
    saveState();
};

window.onkeypress = handleKeyPress;
