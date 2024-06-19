import { browser } from "$app/environment";
import { Character, StatType, type Echo } from "ripple-calculator";
import { get, writable, type Writable } from "svelte/store";
import type { BackendCharacter as CharacterData } from "./backend/character";


// Echo Storage
export const DEFAULT_ECHO: Echo = {
    cost: 1,
    mainStat: {type: StatType.BaseAtk, value: 0},
    secondaryStat: {type: StatType.HpFlat, value: 0},
    substats: []
}
export const echoStorage: Writable<{[key: number]: Echo}> = writable(getFromLocalStorage("echoes", {}));
echoStorage.subscribe(value => {
    if (browser) {
        localStorage.setItem("echoes", JSON.stringify(value));
    }
});
const lastEchoId: Writable<number> = writable(getFromLocalStorage("lastEchoId", 0));
lastEchoId.subscribe(value => {
    if (browser) {
        localStorage.setItem("lastEchoId", JSON.stringify(value));
    }
});

export function addEcho() {
    lastEchoId.update(n => n + 1);
    const id = get(lastEchoId);
    echoStorage.update(echoes => ({...echoes, [id]: structuredClone(DEFAULT_ECHO)}));
}

export function removeEcho(id: number) {
    echoStorage.update(echoes => {
        const newEchoes = {...echoes};
        delete newEchoes[id];
        return newEchoes;
    });
}

// Character Storage
export interface StoredCharacter {
    data: CharacterData;
    character: Character;
    echoes: [number|undefined, number|undefined, number|undefined, number|undefined, number|undefined];
}
export const characterStorage: Writable<{[key: string]: StoredCharacter}> = writable(getFromLocalStorage("characters", {}, (json) => {
    const characters = JSON.parse(json);
    for (const id in characters) {
        characters[id].character = Character.fromInterface(characters[id].character);
    }
    return characters;
}));
characterStorage.subscribe(value => {
    if (browser) {
        localStorage.setItem("characters", JSON.stringify(value));
    }
});

export function addCharacter(data: CharacterData) {
    console.log("Adding character", new Character(data.baseStats.a0l01));
    characterStorage.update(characters => ({...characters, [data.id]: {data, character: new Character(data.baseStats.a0l01), echoes: [undefined, undefined, undefined, undefined, undefined]}}));
}

export function removeCharacter(id: string) {
    characterStorage.update(characters => {
        const newCharacters = {...characters};
        delete newCharacters[id];
        return newCharacters;
    });
}



function getFromLocalStorage<T>(key: string, defaultValue: T, parser: (json: string) => T = json => JSON.parse(json)): T {
    if (!browser) {
        return defaultValue;
    }
    const stored = localStorage.getItem(key);
    try {
        return stored ? parser(stored) : defaultValue;
    } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
        return defaultValue;
    }
}