<script lang=ts>
	import type { CharacterMetadata } from "$lib/backend/character";
	import { Character } from "ripple-calculator";

    export let character: CharacterMetadata;
</script>


<div class="card shadow-xl w-max bg-neutral m-4">
    <div class="card-body">
        <h2 class="card-title">{character.name}</h2>
        <h2>Element: {character.element}</h2>
        <h2>Weapon Type: {character.weapon}</h2>
        <div class="card-actions justify-center">
            <a class="btn btn-primary w-full" href="/characters/{character.id}">Home</a>
        </div>
    </div>    
</div>
