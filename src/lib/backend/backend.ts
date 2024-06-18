
import { BACKEND_URI } from "$lib/config";
import { type CharacterMetadata, type BackendCharacter } from "$lib/backend/character";

export async function getCharacters(): Promise<CharacterMetadata[]> {
    const res = await fetch(`${BACKEND_URI}/characters`)
        .then(response => response.json());
    return res.characters;
}

export async function getCharacter(id: string): Promise<BackendCharacter> {
    console.log("here?");
    const res = await fetch(`${BACKEND_URI}/characters/${id}`)
        .then(response => response.json());
    return res;
}
