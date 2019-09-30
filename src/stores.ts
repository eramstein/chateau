import { get, writable } from "svelte/store";
import { GameState, initGameState } from "./engine/game";
import { handleKeyPress } from "./keybinds";
import { Screen, FullState } from "./ui/model";

export const State = createFullState();

function createFullState() {
    const initialState = getNewState();

    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        update,
        set,
        initialize: () => set(getNewState()),
        load: data => set(data),

        // UI actions
        openWorld: () => update(s => { s.ui.openScreen = Screen.World; return s; }),
        openRegion: regionName => update(s => { s.ui.openScreen = Screen.Region; s.ui.screenParameters = { region: regionName }; return s; }),

        // Gameplay actions
        tempTest: () => update(s => { return s; }),
    };
}

function getNewState(): FullState {
    return {
        game: initGameState(),
        ui: {
            openScreen: Screen.World,
            screenParameters: null,
        },
    };
}

let db;
const request = window.indexedDB.open("chateau", 1);
request.onerror = function (event) {
    console.log('The database failed to open');
};
request.onsuccess = function (event) {    
    db = request.result;
    loadState(); 
};
request.onupgradeneeded = function(event) {
    db = request.result;
    if (!db.objectStoreNames.contains('state')) {
        db.createObjectStore('state', { keyPath: 'id' });
    }
}

function loadState() {
    const transaction = db.transaction(['state']);
    const objectStore = transaction.objectStore('state');
    const request = objectStore.get(1);

    request.onerror = function(event) {
        console.log('Transaction failed in getSavedState');
    };

    request.onsuccess = function(event) {
        if (request.result) {            
            State.load(request.result.state);
        } else {
          console.log('No data record');
        }
     };
}

export function saveState() {
    const savedData = get(State);
    const request = db.transaction(['state'], 'readwrite')
        .objectStore('state')
        .put({ id: 1, state: savedData });
    request.onerror = function (event) {
        console.log('Failure while saving data');
    }
}

export function printState() {
    console.log(get(State));
}

export function resetState() {
    State.initialize();
    saveState();
}

export function tempTest() {
    State.tempTest();
}

window.onbeforeunload = () => {
    saveState();
};

window.onkeypress = handleKeyPress;
