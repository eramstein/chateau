<script>
    export let zone;
</script>

<style>
    .place-name {
        font-weight: bold;
        padding-bottom: 5px;
        text-align: center;
    }
    .character {
        padding: 5px;
        font-weight: bold;
    }
</style>

<div>
    <div>{ zone.name }</div>
    {#each zone.characters as character }
        <div class="character">
            { character }
        </div>        
    {/each}
</div>

