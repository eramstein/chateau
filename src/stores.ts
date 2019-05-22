import { writable, get } from 'svelte/store';
import { spawnPlace, spawnZone } from './engine/spawn';
import { GameState } from './engine/model';

export const GS = createGameState();

function createGameState() {
	const initialState = getSavedState();
	
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		initialize: () => set(getInitialState()),
		addPlace: () => update(gs => spawnPlace(gs)),
		addZone: zoneID => update(gs => spawnZone(gs, zoneID)),
	};
}

function getInitialState(): GameState {
	return { places: [] }
}

function getSavedState(): GameState {
	const savedData = localStorage.getItem("castleSavedGame") || "nope"
	if (savedData === "nope") {
	    return getInitialState()
	} else {
	    const parsedData = JSON.parse(savedData)
	    return parsedData
	}
}
  
export function saveState() {
	const savedData = get(GS);
	
	localStorage.setItem("castleSavedGame", JSON.stringify(savedData))
}
    
window.onbeforeunload = () => {
	saveState()
};
