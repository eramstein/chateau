<script>
    import { State } from '../../../stores';
    import { onMount } from 'svelte';
    import { regionMap } from './drawMap';
    
    let map;

    onMount(() => {
        const canvas = document.getElementById("canvas");
		map = new regionMap($State, canvas, State.clickTile);
    });

    $: {
        if (map) {
            map.update($State);
        }        
    }

</script>

<style>
    .layer {
        width: 100%;
        height: 100%;
    }
</style>

<div class="layer">
    <canvas id="canvas"></canvas>
</div>

