import type { BaseStats, MoveElement, StackableStat } from "ripple-calculator";

export interface CharacterMetadata {
    name: string;
    element: MoveElement;
    weapon: string; // TODO: enum
    id: string;
}

export interface BackendCharacter {
    id: string;
    name: string;
    element: MoveElement;
    weapon: string; // TODO: enum
    baseStats: {[key: string]: BaseStats};
    basicAttackStats: {[key: string]: StackableStat};
    skillStats: {[key: string]: StackableStat};
    libertyStats: {[key: string]: StackableStat};
    forteCircuitStats: {[key: string]: StackableStat};
    introStats: {[key: string]: StackableStat};
    outroStats: {[key: string]: StackableStat};
    inherentSkillStats: {[key: string]: StackableStat};
    statBonuses: {[key: string]: StackableStat};
}

export function characterFromJson(json: string): BackendCharacter {
    const parsed = JSON.parse(json);
    return parsed as BackendCharacter; // TODO: validation?
}

