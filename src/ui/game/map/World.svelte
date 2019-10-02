<script>
    import { State } from '../../../stores';
    import Region from './Region.svelte';

    $: world = $State.game.world;
    $: regions = Object.values(world.regions);
    
</script>

<style>
    .world {
        
    }
    .region {
        float: left;
        width: 300px;
        background: salmon;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
    .region-name {
        font-weight: bold;
        padding-bottom: 5px;
    }
</style>

<div class="world">
    {#each regions as region (region.name) }
        <div class="region" on:click={ () => State.openRegion(region.name) }>
            <div class="region-name">{ region.name }</div>
            <div>{ region.description }</div>
        </div>
    {/each}
</div>

