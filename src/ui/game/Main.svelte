<script>
    import { GS } from '../../stores.js';
    import Place from './Place.svelte'    
</script>

<div>
{#each $GS.places as place, i }	
	<Place place={place} index={i} />
{/each}
</div>

<button on:click={ () => GS.addPlace() }>Add Place</button>
