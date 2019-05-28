<script>
    import Place from './Place.svelte';

    export let region;
    
    $: places = Object.values(region.places);
</script>

<style>
    .place {
        float: left;
        width: 28%;
        background: rgb(243, 240, 239);
        padding: 10px 20px;
        margin: 10px;
    }
</style>

<div>
    {#each places as place (place.name) }
        <div class="place">
            <Place place={place} />
        </div>        
    {/each}
</div>

