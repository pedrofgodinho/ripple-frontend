import { browser } from "$app/environment";
import { StatType, type Echo, type Stat } from "ripple-calculator";
import { get, writable, type Writable } from "svelte/store";


// Echo Storage
export const DEFAULT_ECHO: Echo = {
    cost: 1,
    mainStat: {type: StatType.BaseAtk, value: 0},
    secondaryStat: {type: StatType.HpFlat, value: 0},
    substats: []
}
export const echoes: Writable<{[key: number]: Echo}> = writable(getFromLocalStorage("echoes", []));
echoes.subscribe(value => {
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
    echoes.update(echoes => ({...echoes, [id]: DEFAULT_ECHO}));
}

export function removeEcho(id: number) {
    echoes.update(echoes => {
        const newEchoes = {...echoes};
        delete newEchoes[id];
        return newEchoes;
    });
}

// Character Storage
export interface StoredCharacter {
    id: string;
    echoes: [number|undefined, number|undefined, number|undefined, number|undefined, number|undefined];
} 

const defaultWeapon = {cost: 0, mainStat: {type: StatType.BaseAtk, value: 0}, secondaryStat: {type: StatType.CritDmg, value: 0}, substats: []};

export const weapon: Writable<Echo> = writable(getFromLocalStorage("weapon", defaultWeapon));
export const extraStats: Writable<Stat[]> = writable(getFromLocalStorage("extraStats", []));

weapon.subscribe(value => {
    if (browser) {
        localStorage.setItem("weapon", JSON.stringify(value));
    }
});

extraStats.subscribe(value => {
    if (browser) {
        localStorage.setItem("extraStats", JSON.stringify(value));
    }
});


function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (!browser) {
        return defaultValue;
    }
    const stored = localStorage.getItem(key);
    try {
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
        return defaultValue;
    }
}