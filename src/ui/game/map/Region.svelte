<script>
    import Place from './Place.svelte';

    export let region;
</script>

<div>
    <div>{ region.name }</div>
    <div>{ region.description }</div>
    {#each region.places as place (place.name) }	
        <Place place={place} />
    {/each}
</div>

