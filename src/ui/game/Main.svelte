<script>
    import { State } from '../../stores';
    import World from './map/World.svelte';
    import Region from './map/Region.svelte';
    import Sidebar from './sidebar/Sidebar.svelte';
</script>

<style>    
    .screen {
        display: flex;
        height: 100vh;
    }
    .left-panel {
        width: 80%;
        border-right: 1px solid #ccc;
    }
    .right-panel {
        width: 20%;
        padding-top: 5px;
    }
</style>

<div class="screen">
    <div class="left-panel">
        {#if $State.ui.openScreen === "WORLD"}
            <World world={$State.game.world} />
        {/if}
        {#if $State.ui.openScreen === "REGION"}
            <Region region={$State.game.world.regions[$State.ui.screenParameters.region]} />
        {/if}
    </div>
    <div class="right-panel">
        <Sidebar ui={$State.ui} game={$State.game} />
    </div>
</div>

