<script>
  import { State } from "../../../stores";
  $: characters = $State.game.characters;
</script>

<div class="characters">
  {#each characters as character}
    <div>
      <div><b>{character.name}</b></div>
      <textarea class="json-dump">{JSON.stringify(character, null, 2)}</textarea
      >
    </div>
  {/each}
</div>

<style>
  .json-dump {
    width: 400px;
    height: 800px;
  }
</style>
