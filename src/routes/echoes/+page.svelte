<script lang="ts">
	import EchoEditor from "$lib/components/EchoEditor.svelte";
    import {addEcho, removeEcho, echoStorage} from "$lib/store";
</script>

<main class="flex flex-wrap">
    {#each Object.keys($echoStorage) as key, i}
        <EchoEditor bind:echo={$echoStorage[key]} on:deleteEcho={(_) => removeEcho(key)}>Echo {i}</EchoEditor> <!-- Don't know how to get TS to accept key here, but it is guaranteed valid -->
    {/each}
    <div class="card shadow-xl w-96 bg-neutral m-4">
        <div class="card-body">
            <button class="btn btn-primary" on:click={() => addEcho()}>Add Echo</button>
        </div>
    </div>
</main>
