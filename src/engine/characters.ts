import { getCastlePosition, Position } from "./world";
import { HealthStatus, getDefaultHealthStatus } from "./health";
import { Needs, getDefaultNeeds } from "./needs";
import { GameState } from "./game";
import { setCharacterPosition } from "./movement";

export interface Character {
    name: string;
    position: Position;
    health: HealthStatus;
    needs: Needs;
}

const INIT_CHARACTERS_COUNT = 2;

export function updateCharacters(gs: GameState) {
    Object.values(gs.characters).forEach(char => {
        updateCharacter(gs, char);
    });
}

export function updateCharacter(gs: GameState, char: Character) {
    char.needs.hunger++;
}

export function setInitialCharacters(gs: GameState) {
    const castlePosition = getCastlePosition(gs.world);

    for (let index = 0; index < INIT_CHARACTERS_COUNT; index++) {
        const newCharacter = makeCharacter(gs);        
        gs.characters[newCharacter.name] = newCharacter;
        setCharacterPosition(gs, newCharacter.name, castlePosition);
    }

}

export function makeCharacter(gs: GameState): Character {
    return {
        name: "bibi " + Math.floor(Math.random() * 100000),
        position: null,
        health: getDefaultHealthStatus(),
        needs: getDefaultNeeds(),
    };
}
