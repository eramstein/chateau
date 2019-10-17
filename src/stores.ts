import { get, writable } from "svelte/store";
import { GameState, initGameState } from "./engine/game";
import { handleKeyPress } from "./keybinds";
import { Screen, FullState } from "./ui/model";
import { movePlayer } from "./engine/movement";
import { onClickTile } from "./ui/game/map/onClickTile";

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
        setRegion: (region) => update(s => { s.game.world.regions[region.name] = region; return s; }),

        // UI actions
        openWorld: () => update(s => { s.ui.openScreen = Screen.World; return s; }),
        openRegion: regionName => update(s => { s.ui.openScreen = Screen.Region; s.ui.screenParameters = { region: regionName }; return s; }),
        clickTile: position => update(s => { s.ui.selection = onClickTile(s.game, position); return s; }),

        // Gameplay actions
        tempTest: () => update(s => { return s; }),
        movePlayer: ({ x, y, z }) => update(s => { const newGS = movePlayer(s.game, { x, y, z }); s.game = newGS; return s; }),
    };
}

function getNewState(): FullState {
    return {
        game: initGameState(),
        ui: {
            openScreen: Screen.World,
            screenParameters: null,
            selection: null,
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
    if (!db.objectStoreNames.contains('regions')) {
        db.createObjectStore('regions', { keyPath: 'id' });
    }
}

function loadState() {
    var t0 = performance.now();
    const transaction = db.transaction(['state']);
    const objectStore = transaction.objectStore('state');
    let request = objectStore.get(1);

    request.onerror = function(event) {
        console.log('Failure while loading data', event.target);
    };

    request.onsuccess = function(event) {
        if (request.result) {            
            State.load(request.result.state);            
            var t1 = performance.now();
            console.log("Data loaded in " + (t1 - t0));
        } else {
          console.log('No data record');
        }
    };

    transaction.oncomplete = function(event) {
        console.log(get(State));
        
        const regionsTransaction = db.transaction(['regions']);
        const regionsStore = regionsTransaction.objectStore('regions');
        regionsStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {            
                State.setRegion(cursor.value.data);
                cursor.continue();
            }
        };
    };

}

export function saveState() {
    var t0 = performance.now();
    const savedData = get(State);
    const regions = savedData.game.world.regions;
    savedData.game.world.regions = {};

    const request = db.transaction(['state'], 'readwrite')
        .objectStore('state')
        .put({ id: 1, state: savedData });
    request.onerror = function (event) {
        console.log('Failure while saving data', event.target);
    }
    request.onsuccess = function(event) {
        var t1 = performance.now();
        console.log("Data saved in " + (t1 - t0));
    };

    Object.values(regions).forEach(r => {
        const request = db.transaction(['regions'], 'readwrite')
            .objectStore('regions')
            .put({ id: r.name, data: r });
        request.onerror = function (event) {
            console.log('Failure while saving region', r, event.target);
        }
    });
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
    //saveState();
};

window.onkeypress = handleKeyPress;
