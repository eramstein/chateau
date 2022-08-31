<script>
  import { State } from "../../../stores";
  $: items = $State.game.items;
</script>

<div class="items">
  <textarea class="json-dump">{JSON.stringify(items, null, 2)}</textarea>
</div>

<style>
  .json-dump {
    width: 400px;
    height: 800px;
  }
</style>
