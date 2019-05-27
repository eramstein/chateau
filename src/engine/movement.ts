import { GameState } from "./game";
import { Character } from "./characters";
import { Position } from "./world";
import { zoneFromPosition } from "../utils";

export function setCharacterPosition(gs : GameState, characterName: string, position: Position) {    
    gs.characters[characterName].position = position;    
    zoneFromPosition(gs, position).characters.push(characterName);
}
