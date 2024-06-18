<script lang=ts>
    import { onMount } from "svelte";
    import { getCharacters, getCharacter } from "$lib/backend/backend";
	import type { CharacterMetadata } from "$lib/backend/character";

    let waiting: boolean = true;
    let characters: CharacterMetadata[] = [];
    onMount(async () => {
        characters = await getCharacters();
        waiting = false;
    });

</script>

<main class="container-fluid">
    {#if !waiting}
        <ul>
            {#each characters as character}
            <article>
                <h1>{character.name}</h1>
                <p>Weapon: {character.weapon}</p>
                <p>Element: {character.element}</p>
                <a href={`characters/${character.id}`}>
                    <button>Select</button>
                </a>
            </article>
            {/each}
        </ul>
    {/if}
</main>
