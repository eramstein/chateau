<script>
    import Zone from './Zone.svelte';

    export let place;

    $: zones = Object.values(place.zones);
</script>

<style>
    .zone {
        float: left;
        width: 92%;
        background: rgb(209, 195, 190);
        padding: 10px 10px;
        margin: 5px;
    }
    .place-name {
        font-weight: bold;
        padding-bottom: 5px;
        text-align: center;
    }
</style>

<div>
    <div class="place-name">{ place.name }</div>
    {#each zones as zone (zone.name) }
        <div class="zone">
            <Zone zone={zone} />
        </div>
    {/each}
</div>

