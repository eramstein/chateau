<script>
    export let zone;
</script>

<div>
    <div>{ zone.name }</div>
    {#each zone.characters as character }
        <div>
            { character }
        </div>        
    {/each}
</div>

