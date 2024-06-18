<script lang="ts">
	import { getCharacter } from "$lib/backend/backend";
	import type { BackendCharacter } from "$lib/backend/character";
	import type { Character } from "ripple-calculator";
	import type { PageData } from "../$types";
    import { onMount } from "svelte";

    export let data: PageData;

    let backendCharacter: BackendCharacter;
    let waiting: boolean = true;
    onMount(async () => {
        backendCharacter = await getCharacter(data.id); // Don't know how to get TS to recognize data.id
        waiting = false;
    });

</script>

<main class="container-fluid">
    {#if !waiting}
        <p>{JSON.stringify(backendCharacter)}</p>
    {/if}

</main>
