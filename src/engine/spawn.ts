import { GameState } from "./model";

export function spawnPlace(gs: GameState): GameState {
    gs.places.push({ name: 'woot', zones: [] })
    return gs
}

export function spawnZone(gs: GameState, zoneID: number): GameState {    
    gs.places[zoneID].zones.push({ name: 'yoohoo' })
    return gs
}