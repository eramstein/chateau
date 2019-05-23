<script>
    import Zone from './Zone.svelte';

    export let place;
</script>

<div>
    <div>{ place.name }</div>
    {#each place.zones as zone (zone.name) }	
        <Zone zone={zone} />
    {/each}
</div>

