<script>
    import Place from './Place.svelte';

    export let region;
</script>

<style>
    .place {
        float: left;
        width: 300px;
        background: rgb(236, 231, 230);
        padding: 10px 20px;
        margin: 10px;
    }
</style>

<div>
    {#each region.places as place (place.name) }
        <div class="place">
            <Place place={place} />
        </div>        
    {/each}
</div>

