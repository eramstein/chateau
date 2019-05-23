import { writable, get } from 'svelte/store';
import { GameState, initGameState } from './engine/game';
import { handleKeyPress } from './keybinds';

export enum Screen {
	World = "WORLD",
	Region = "REGION",
}

export interface UI {
	openScreen: Screen;
	selections: {
		region: string;
	}
}

export interface FullState {
	game: GameState;
	ui: UI,
}

export const State = createFullState();

function createFullState() {
	const initialState = getSavedState();
	
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		initialize: () => set(getNewState()),

		// UI actions
		openWorld: () => update(s => { s.ui.openScreen = Screen.World; return s; }),
		openRegion: regionID => update(s => { s.ui.openScreen = Screen.Region; s.ui.selections.region = regionID; return s; }),

		// Gameplay actions
		// addZone: zoneID => update(gs => spawnZone(gs, zoneID)),
	};
}

function getNewState(): FullState {
	return {
		game: initGameState(),
		ui: {
			openScreen: Screen.World,
			selections: {
				region: null,
			},
		},
	}
}

function getSavedState(): FullState {
	const savedData = localStorage.getItem("castleSavedGame") || "nope"
	if (savedData === "nope") {
	    return getNewState()
	} else {
	    const parsedData = JSON.parse(savedData)
	    return parsedData
	}
}
  
export function saveState() {
	const savedData = get(State);	
	localStorage.setItem("castleSavedGame", JSON.stringify(savedData))
}

export function resetState() {
	State.initialize()
	saveState()
}
    
window.onbeforeunload = () => {
	saveState()
};

window.onkeypress = handleKeyPress;