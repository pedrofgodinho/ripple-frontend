<script lang=ts>
    import { onMount } from "svelte";
    import { getCharacters, getCharacter } from "$lib/backend/backend";
	import type { CharacterMetadata } from "$lib/backend/character";
	import CharacterSelector from "$lib/components/CharacterSelector.svelte";

    let waiting: boolean = true;
    let characters: CharacterMetadata[] = [];
    onMount(async () => {
        characters = await getCharacters();
        console.log(characters);
        waiting = false;
    });

</script>

<main class="flex flex-wrap">
    {#if !waiting}
        {#each characters as character}
            <CharacterSelector character={character}/>
        {/each}
    {/if}
</main>
