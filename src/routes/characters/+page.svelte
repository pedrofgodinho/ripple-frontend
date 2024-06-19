<script lang=ts>
    import { onMount } from "svelte";
    import { getCharacters, getCharacter } from "$lib/backend/backend";
	import type { CharacterMetadata } from "$lib/backend/character";
	import CharacterSelector from "$lib/components/CharacterSelector.svelte";
	import { addCharacter, characterStorage } from "$lib/store";

    let waiting: boolean = true;
    let metadatas: CharacterMetadata[] = [];
    $: missingCharacters = metadatas.filter(metadata => {
        return $characterStorage[metadata.id] === undefined;
    });
    $: ownedCharacters = metadatas.filter(metadata => {
        return $characterStorage[metadata.id] !== undefined;
    });

    onMount(async () => {
        metadatas = await getCharacters();
        
        waiting = false;
    });

</script>

<main class="flex flex-wrap">
    {#if !waiting}
        {#each ownedCharacters as metadata}
            <CharacterSelector character={metadata} />
        {/each}
        
        {#if missingCharacters.length !== 0}
            <div class="card shadow-xl w-60 bg-neutral m-4">
                <select class="select select-bordered select-primary m-4">
                    {#each missingCharacters as character}
                        <option value={character.id}>{character.name}</option>
                    {/each}
                </select>
                <div class="card-body">
                    <button class="btn btn-primary" on:click={async () => addCharacter(await getCharacter("jiyan"))}>Add Character</button>
                </div>
            </div>
        {/if}
    {/if}
</main>
