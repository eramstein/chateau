<script>    
    import { GS } from '../../stores.js';
    export let place;
    export let index;    
</script>

<div>{place.name}</div>
{#each place.zones as zone }	
	<div>{ zone.name }</div>
{/each}
<button on:click={ () => GS.addZone(index) }>Add Zone</button>
