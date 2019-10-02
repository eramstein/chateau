import { FullState } from '../../model';
import { Tile } from '../../../engine/terrain';
import { SURFACE_TILES, GROUND_TILES } from './tiles';

export function regionMap(state : FullState, canvas : HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');
    canvas.style.width ='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = document.body.clientHeight;    

    const { tilesCountWidth, tilesCountHeight } = getDimensions(canvas.width, canvas.height);
    const region = state.game.world.regions[state.ui.screenParameters.region];
    const camera = state.game.camera;    
    const tileSize = canvas.height / tilesCountHeight;

    this.update = function(state : FullState) {
        console.log('UPDATE MAP');        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const tilesInRange = getTilesInRange(region.tiles, camera, tilesCountWidth, tilesCountHeight);        
        drawGround(ctx, tilesInRange, tileSize);
    }    

}

function drawGround(ctx, tilesInRange : Tile[][], tileSize : number) {
    for (let x = 0; x < tilesInRange.length; x++) {
        const column = tilesInRange[x];
        for (let y = 0; y < column.length; y++) {
            const tile = tilesInRange[x][y];
            let groundColor;
            if (tile.surface) {
                groundColor = SURFACE_TILES[tile.surface] || '#ccc';
            } else {
                groundColor = GROUND_TILES[tile.ground] || '#ccc';
            }
            ctx.fillStyle = groundColor;
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);       
        }        
    }
}

function getDimensions(width : number, height : number) {

    const TILES_AT_DEFAULT_ZOOM = 25;

    let tilesCountWidth = TILES_AT_DEFAULT_ZOOM;
    let tilesCountHeight = TILES_AT_DEFAULT_ZOOM;
    
    if (width > height) {
        tilesCountWidth = Math.floor(TILES_AT_DEFAULT_ZOOM * (width / height));
    } else {
        tilesCountHeight = Math.floor(TILES_AT_DEFAULT_ZOOM * (height / width));
    }

    return {
        tilesCountWidth,
        tilesCountHeight,
    }
    
}

function getTilesInRange(tiles : Tile[][][], camera, tilesCountWidth, tilesCountHeight) {

    const layer = tiles[camera.position.z];
    const xFrom = Math.max(0, camera.position.x - tilesCountWidth - Math.max(0, camera.position.x - (layer.length - tilesCountWidth)));
    const xTo = Math.min(layer.length, camera.position.x + tilesCountWidth + Math.max(0, tilesCountWidth - camera.position.x));
    
    return layer
        .slice(xFrom, xTo)
        .map(row => {
            const yFrom = Math.max(0, camera.position.y - tilesCountHeight - Math.max(0, camera.position.y - (row.length - tilesCountHeight)));
            const yTo = Math.min(row.length, camera.position.y + tilesCountHeight + Math.max(0, tilesCountHeight - camera.position.y));
            return row.slice(yFrom, yTo)
        });

}