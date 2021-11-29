<script>
    import { State } from '../../../stores';
    $: regions = $State.game.world.regions;
</script>

<style>
    .json-dump {
        width: 400px;
        height: 800px;
    }
</style>

<div class="world">
    {#each regions as region}
		<div>
            <div><b>{region.name}</b></div>
            <textarea class="json-dump">{JSON.stringify(region, null, 2)}</textarea>
        </div>
	{/each}
</div>
