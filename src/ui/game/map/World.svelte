<script lang="ts">
    import { State } from "../../../stores";
    $: tiles = $State.game.world.tiles[0] || [];
    $: {
        console.log(tiles);
    }
</script>

<div class="world">
    {#each tiles as row}
        <div>
            {#each row as tile}
                <div class={tile.terrain} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .world {
        width: fit-content;
    }
    .world div {
        display: flex;
    }
    .world div div {
        height: 30px;
        width: 30px;
        border: 1px solid rgba(230, 230, 230, 0.1);
    }
    .G {
        background-color: green;
    }
    .R {
        background-color: gray;
    }
</style>
