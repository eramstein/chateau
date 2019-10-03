import { FullState } from '../../model';
import { Tile } from '../../../engine/terrain';
import { SURFACE_TILES, GROUND_TILES, PLAYER_SYMBOL } from './tiles';
import { Region } from '../../../engine/world';
import { Player } from '../../../engine/player';
import { Camera } from '../../../engine/game';

const TILES_AT_DEFAULT_ZOOM = 30;
const FONT = '20px Arial'; 

export function regionMap(state : FullState, canvas : HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');
    canvas.style.width ='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = document.body.clientHeight;
    ctx.font = FONT; 

    const { tilesCountWidth, tilesCountHeight } = getDimensions(canvas.width, canvas.height);
    const tileSize = canvas.height / tilesCountHeight;
    const cameraPixelPos = {
        x: (Math.ceil(tilesCountWidth/2) + 0.25 + (tilesCountWidth % 2 === 0 ? 1 : 0)) * tileSize,
        y: (Math.ceil(tilesCountHeight/2) - 0.25 + (tilesCountHeight % 2 === 0 ? 1 : 0)) * tileSize,
    };      

    this.update = function(state : FullState) {
        const player = state.game.player;
        const region = state.game.world.regions[state.ui.screenParameters.region];
        const camera = state.game.camera;

        console.log('UPDATE MAP');        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const tilesInRange = getTilesInRange(region.tiles, camera, tilesCountWidth, tilesCountHeight);
        const cameraOffset = getCameraOffset(camera,  region, tilesCountWidth, tilesCountHeight);
        console.log(player.position);
              
        drawGround(ctx, tilesInRange, tileSize);
        drawPlayer(ctx, camera, player, tileSize, cameraPixelPos, cameraOffset);
    }
}

function getCameraOffset(camera : Camera,  region : Region, tilesCountWidth, tilesCountHeight) : { x : number, y : number } {
    let offsetX = 0;
    let offsetY = 0;
    const regionWidth = region.tiles[0].length;
    const regionHeight = region.tiles[0][0].length;

    if (camera.position.x < tilesCountWidth / 2) {
        offsetX = - Math.ceil(tilesCountWidth / 2 - camera.position.x);
    }
    if (camera.position.x > regionWidth - tilesCountWidth / 2) {
        offsetX = Math.ceil(camera.position.x - (regionWidth - tilesCountWidth / 2));
    }
    if (camera.position.y < tilesCountHeight / 2) {
        offsetY = - Math.ceil(tilesCountHeight / 2 - camera.position.y);
    }
    if (camera.position.y > regionHeight - tilesCountHeight / 2) {
        offsetY = Math.ceil(camera.position.y - (regionHeight - tilesCountHeight / 2));
    }

    return {
        x: offsetX,
        y: offsetY,
    }
}

function drawPlayer(ctx, camera : Camera, player : Player, tileSize : number, cameraPixelPos, cameraOffset) {
    if (player.position.region === camera.position.region && player.position.z === camera.position.z) {        
        const x = cameraPixelPos.x + (player.position.x - camera.position.x + cameraOffset.x) * tileSize;
        const y = cameraPixelPos.y + (player.position.y - camera.position.y + cameraOffset.y) * tileSize;
        ctx.fillStyle = '#333';
        ctx.font = FONT;
        ctx.fillText(PLAYER_SYMBOL, x, y);
        ctx.fillText('C', cameraPixelPos.x, cameraPixelPos.y);
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
            ctx.fillStyle = '#333';
            ctx.font = '8px Arial'; 
            ctx.fillText(tile.x + '.' + tile.y, x * tileSize, y * tileSize + 10);
        }        
    }
}

function getDimensions(width : number, height : number) : { tilesCountWidth : number, tilesCountHeight : number } {
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

function getTilesInRange(tiles : Tile[][][], camera, tilesCountWidth, tilesCountHeight) : Tile[][] {
    const horizontalTiles = Math.ceil(tilesCountWidth / 2);
    const verticalTiles = Math.ceil(tilesCountHeight / 2);

    const layer = tiles[camera.position.z];
    const xFrom = Math.max(0, camera.position.x - horizontalTiles - Math.max(0, camera.position.x - (layer.length - horizontalTiles)));
    const xTo = Math.min(layer.length, camera.position.x + horizontalTiles + Math.max(0, horizontalTiles - camera.position.x));
    
    return layer
        .slice(xFrom, xTo)
        .map(row => {
            const yFrom = Math.max(0, camera.position.y - verticalTiles - Math.max(0, camera.position.y - (row.length - verticalTiles)));
            const yTo = Math.min(row.length, camera.position.y + verticalTiles + Math.max(0, verticalTiles - camera.position.y));
            return row.slice(yFrom, yTo)
        });
}