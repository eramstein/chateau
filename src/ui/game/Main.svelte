<script>
    import { State } from '../../stores';
    import World from './map/World.svelte';
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
            <World />
        {/if}
    </div>
    <div class="right-panel">
        <Sidebar />
    </div>
</div>

