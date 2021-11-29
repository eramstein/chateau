<script>
    import { State } from '../../stores';
    import { Screen } from '../model';
    import World from './map/World.svelte';
    import Items from './items/Items.svelte';
    import Characters from './characters/Characters.svelte';
    import Sidebar from './sidebar/Sidebar.svelte';

    $: screen = $State.ui.openScreen
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
        {#if screen === Screen.World}
            <World />
        {/if}
        {#if screen === Screen.Characters}
            <Characters />
        {/if}
        {#if screen === Screen.Items}
            <Items />
        {/if}
    </div>
    <div class="right-panel">
        <Sidebar />
    </div>
</div>

