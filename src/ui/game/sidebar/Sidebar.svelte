<script>
    import { State } from '../../../stores';

    export let game;
    export let ui;    
</script>

<style>
    .top-menu {
        display: flex;
    }
    .top-menu div {
        padding-right: 20px;
    }
    .selected {
        font-weight: bold;
    }
</style>

<div>
    <div class="top-menu">
        <div class={ ui.openScreen === "WORLD" ? "selected" : ""} 
            on:click={ () => State.openWorld() }
        >
            MONDE
        </div>
        <div>PERSOS</div>
    </div>
    <div>
        {#if ui.openScreen === "WORLD"}
            { game.world.name }
        {/if}
    </div>    
</div>

