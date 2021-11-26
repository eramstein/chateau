<script>
    import { State } from '../../../stores';
    $: characters = $State.game.characters;
</script>

<style>
    .characters {
        
    }
</style>

<div class="characters">
    {#each characters as character}
		<div>
            <div>{character.name}</div>
            <div>{JSON.stringify(character)}</div>
        </div>
	{/each}
</div>

