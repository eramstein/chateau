import { Position } from "../../../engine/world";
import { Selection, SelectionType } from "../../model";
import { GameState } from "../../../engine/game";

export function onClickTile(state : GameState, position : Position) : Selection {    
    const tile = state.world.regions[position.region].tiles[position.z][position.x][position.y];
    console.log(tile);
    const selection : Selection = {
        type: SelectionType.Tile,
        id: position,
        data: tile,
    }        
    return selection;
}