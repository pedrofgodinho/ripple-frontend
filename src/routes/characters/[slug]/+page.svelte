<script lang="ts">
	import type { PageData } from "../$types";
	import { type StoredCharacter, characterStorage } from "$lib/store";
	import { get } from "svelte/store";
	import CharacterSelector from "$lib/components/CharacterSelector.svelte";
	import CharacterStatDisplay from "$lib/components/CharacterStatDisplay.svelte";

    export let data: PageData;
    let character: StoredCharacter = $characterStorage[data.id];
</script>

<main class="flex flex-wrap">
    {#if character}
        <p>{JSON.stringify(character)}</p>

        <!--Character Sheet-->
        <div class="card shadow-xl w-max bg-neutral m-4">
            <div class="card-body">
                <h2 class="card-title">{character.data.name}</h2>
                <h2>Element: {character.data.element}</h2>
                <h2>Weapon Type: {character.data.weapon}</h2>
            </div>
        </div>

        <!--Character Stats-->
        <CharacterStatDisplay bind:character={character}/>

    {/if}
</main>
