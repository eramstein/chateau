<script>
    import { State } from '../../../stores';
    import SideRegion from './SideRegion.svelte';
    import TileDetails from './TileDetails.svelte';

    export let game;
    export let ui;    
</script>

<style>
    .top-menu {
        display: flex;
        padding-left: 20px;
        padding-top: 5px;
        padding-bottom: 10px;
    }
    .top-menu div {
        padding-right: 20px;
    }
    .selected {
        font-weight: bold;
    }
    .block {
        padding-top: 10px;
        padding-bottom: 10px;
        border-top: 1px solid #ccc;
        padding-left: 20px;
    }
    .details {
    }
</style>

<div>
    <div class="top-menu">
        <div class={ ui.openScreen === "WORLD" || ui.openScreen === "REGION" ? "selected" : ""} 
            on:click={ () => State.openWorld() }
        >
            MONDE
        </div>
        <div>PERSOS</div>
    </div>
    <div class="block">
        <span>Année {game.time.year}</span>
        <span>Saison {game.time.season}</span>
        <span style="padding-right: 20px">Jour {game.time.day}</span>
        <span>{game.time.hour}:{game.time.minute < 10 ? '0' : ''}{game.time.minute}:{game.time.second < 10 ? '0' : ''}{game.time.second}</span>
    </div>
    <div class="block details">
        {#if ui.selection}
            {#if ui.selection.type === "TILE"}
                <TileDetails tile={ui.selection.data} />
            {:else if 5 > x}
                <p>soon</p>
            {/if}
        {:else}
            {#if ui.openScreen === "WORLD"}
                { game.world.name }
            {/if}
            {#if ui.openScreen === "REGION"}
                <SideRegion region={game.world.regions[ui.screenParameters.region]} />
            {/if}
        {/if}        
    </div>    
</div>

