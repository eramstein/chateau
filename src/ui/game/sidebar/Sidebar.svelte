<script>
    import { State } from '../../../stores';
    import { SimSpeed, Screen } from '../../model';
    import SideRegion from './SideRegion.svelte';
    $: ui = $State.ui;
    $: game = $State.game;
  
    let simInterval
    $: {
        clearInterval(simInterval)
        if (ui.simSpeed > 0) {
            simInterval = setInterval(() => State.runSimulation(ui.simSpeed), 1000)
        }        
    }
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
        <div class={ ui.openScreen === Screen.World || ui.openScreen === Screen.Region ? "selected" : ""} 
            on:click={ () => $State.ui.openScreen = Screen.World }>MONDE</div>
        <div  class={ ui.openScreen === Screen.Characters ? "selected" : ""} 
            on:click={ () => $State.ui.openScreen = Screen.Characters }>PERSOS</div>
        <div  class={ ui.openScreen === Screen.Items ? "selected" : ""} 
            on:click={ () => $State.ui.openScreen = Screen.Items }>OBJETS</div>
    </div>
    <div class="block">
        <div>
            {game.time}
        </div>
        <div>
            <button on:click={ () => ui.simSpeed = SimSpeed.S0 }>||</button>
            <button on:click={ () => ui.simSpeed = SimSpeed.S1 }>></button>
            <button on:click={ () => ui.simSpeed = SimSpeed.S2 }>>></button>
            <button on:click={ () => ui.simSpeed = SimSpeed.S3 }>>></button>
        </div>
    </div>
    <div class="block details">
        {#if ui.selection}
            <p>soon</p>
        {:else}
            {#if ui.openScreen === Screen.World}
                world
            {/if}
            {#if ui.openScreen === Screen.Region}
                <SideRegion region={game.world.regions[ui.screenParameters.region]} />
            {/if}
        {/if}        
    </div>    
</div>

