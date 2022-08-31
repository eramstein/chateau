import { get, writable } from "svelte/store";
import { initGameState, runSimulation } from "./engine/game";
import { GameState } from "./engine/model";
import { handleKeyPress } from "./keybinds";
import { Screen, FullState, SimSpeed } from "./ui/model";

const defaultUiState = {
  openScreen: Screen.World,
  screenParameters: null,
  simSpeed: SimSpeed.S0,
};

const defaultGameState: GameState = {
  world: { tiles: [] },
  characters: [],
  items: {},
  time: 0,
};

export const State = createFullState();

function createFullState() {
  const initialState = {
    game: defaultGameState,
    ui: defaultUiState,
  };

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    update,
    set,
    initialize: () => set(getNewState()),
    load: (data) => set(data),
    runSimulation: (seconds) =>
      update((s) => {
        runSimulation(s.game, seconds);
        return s;
      }),
  };
}

function getNewState(): FullState {
  return {
    game: initGameState(),
    ui: {
      openScreen: Screen.Characters,
      screenParameters: null,
      simSpeed: SimSpeed.S0,
    },
  };
}

let db;
const request = window.indexedDB.open("chateau", 1);
request.onerror = function (event) {
  console.log("The database failed to open");
};
request.onsuccess = function (event) {
  db = request.result;
  loadState();
};
request.onupgradeneeded = function (event) {
  db = request.result;
  if (!db.objectStoreNames.contains("state")) {
    db.createObjectStore("state", { keyPath: "id" });
  }
};

function loadState() {
  const t0 = performance.now();
  const transaction = db.transaction(["state"]);
  const objectStore = transaction.objectStore("state");
  const request = objectStore.get(1);

  request.onerror = function (event) {
    console.log("Failure while loading data", event.target);
  };

  request.onsuccess = function (event) {
    if (request.result) {
      State.load(request.result.state);
      const t1 = performance.now();
      console.log("Data loaded in " + (t1 - t0));
    } else {
      console.log("No data record");
    }
  };

  // transaction.oncomplete = function (event) {
  //   const regionsTransaction = db.transaction(['regions'])
  //   const regionsStore = regionsTransaction.objectStore('regions')
  //   regionsStore.openCursor().onsuccess = function (event) {
  //     const cursor = event.target.result
  //     if (cursor) {
  //       State.setRegion(cursor.value.data)
  //       cursor.continue()
  //     }
  //   }
  // }
}

export function saveState() {
  console.log("Saving state");

  const t0 = performance.now();
  const savedData = get(State);
  // const regions = savedData.game.world.regions
  // savedData.game.world.regions = {}

  const request = db
    .transaction(["state"], "readwrite")
    .objectStore("state")
    .put({ id: 1, state: savedData });
  request.onerror = function (event) {
    console.log("Failure while saving data", event.target);
  };
  request.onsuccess = function (event) {
    const t1 = performance.now();
    console.log("Data saved in " + (t1 - t0));
  };

  // Object.values(regions).forEach(r => {
  //   const request = db.transaction(['regions'], 'readwrite')
  //     .objectStore('regions')
  //     .put({ id: r.name, data: r })
  //   request.onerror = function (event) {
  //     console.log('Failure while saving region', r, event.target)
  //   }
  // })
}

export function printState() {
  console.log("printState", get(State));
}

export function resetState() {
  State.initialize();
  saveState();
}

window.onbeforeunload = () => {
  // saveState();
};

window.onkeypress = handleKeyPress;
