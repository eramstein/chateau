<script>
    import { State } from '../../../stores';
    $: items = $State.game.items;
</script>

<style>
    .json-dump {
        width: 400px;
        height: 800px;
    }
</style>

<div class="items">
    <textarea class="json-dump">{JSON.stringify(items, null, 2)}</textarea>
</div>

