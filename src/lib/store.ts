import { browser } from "$app/environment";
import { StatType, type Echo, type Stat } from "ripple-calculator";
import { writable, type Writable } from "svelte/store";

const defaultWeapon = {cost: 0, mainStat: {type: StatType.BaseAtk, value: 0}, secondaryStat: {type: StatType.CritDmg, value: 0}, substats: []};
const defaultEcho: Echo = {cost: 0, mainStat: {type: StatType.AtkPercent, value: 0}, secondaryStat: {type: StatType.AtkFlat, value: 0}, substats: []};
export const defaultEchoes: Echo[] = [
    structuredClone(defaultEcho),
    structuredClone(defaultEcho),
    structuredClone(defaultEcho),
    structuredClone(defaultEcho),
    structuredClone(defaultEcho),
];

export const weapon: Writable<Echo> = writable(getFromLocalStorage("weapon", defaultWeapon));
export const echoes: Writable<Echo[]> = writable(getFromLocalStorage("echoes", defaultEchoes));
export const extraStats: Writable<Stat[]> = writable(getFromLocalStorage("extraStats", []));

weapon.subscribe(value => {
    if (browser) {
        localStorage.setItem("weapon", JSON.stringify(value));
    }
});
echoes.subscribe(value => {
    if (browser) {
        localStorage.setItem("echoes", JSON.stringify(value));
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