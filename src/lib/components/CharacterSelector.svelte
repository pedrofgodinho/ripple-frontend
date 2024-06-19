<script lang=ts>
	import type { CharacterMetadata } from "$lib/backend/character";
	import { removeCharacter } from "$lib/store";
	import { Character } from "ripple-calculator";

    export let character: CharacterMetadata;

    function deleteCharacter() {
        removeCharacter(character.id);
    }
</script>


<div class="card shadow-xl w-max bg-neutral m-4">
    <div class="card-body">
        <div class="flex">
            <h2 class="card-title w-full">
                {character.name}
            </h2>
            <button class="btn btn-square btn-sm" on:click={deleteCharacter}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <h2>Element: {character.element}</h2>
        <h2>Weapon Type: {character.weapon}</h2>
        <div class="card-actions justify-center">
            <a class="btn btn-primary w-full" href="/characters/{character.id}">Select</a>
        </div>
    </div>    
</div>
