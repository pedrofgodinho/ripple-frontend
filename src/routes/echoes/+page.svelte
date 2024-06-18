<script lang="ts">
	import EchoCreator from "$lib/components/EchoCreator.svelte";
    import {DEFAULT_ECHO, echoes} from "$lib/store";

    function addEcho() {
        $echoes = [...$echoes, DEFAULT_ECHO];
    }
</script>

<main class="flex flex-wrap">
    {#each $echoes as echo, i}
        <EchoCreator bind:echo={echo}>Echo {i}</EchoCreator>
    {/each}
    <div class="card shadow-xl w-96 bg-neutral m-4">
        <div class="card-body">
            <button class="btn btn-primary" on:click={addEcho}>Add Echo</button>
        </div>
    </div>
</main>
