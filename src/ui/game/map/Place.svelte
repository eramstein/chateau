<script>
    import Zone from './Zone.svelte';

    export let place;

    const zones = Object.values(place.zones);
</script>

<div>
    <div>{ place.name }</div>
    {#each zones as zone (zone.name) }	
        <Zone zone={zone} />
    {/each}
</div>

