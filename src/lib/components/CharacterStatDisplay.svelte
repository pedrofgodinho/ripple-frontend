<script lang="ts">
	import type { StoredCharacter } from "$lib/store";
	import { CharacterStats, MoveElement, MoveType } from "ripple-calculator";

    export let character: StoredCharacter;

    function percent(num: number) {
        return `${round(num) * 100}%`;
    }

    function round(num: number) {
        return Math.round(num * 100) / 100;
    }
</script>

<div class="card shadow-xl w-max bg-neutral m-4">
    <div class="card-body">
        <h2 class="card-title">Stats</h2>
        <table class="table table-zebra">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>HP</td>
                    <td>{round(character.character.stats.getHp())}</td>
                </tr>
                <tr>
                    <td>Atk</td>
                    <td>{round(character.character.stats.getAtk())}</td>
                </tr>
                <tr>
                    <td>Def</td>
                    <td>{round(character.character.stats.getDef())}</td>
                </tr>
                <tr>
                    <td>Crit Rate</td>
                    <td>{percent(character.character.stats.critRate)}</td>
                </tr>
                <tr>
                    <td>Crit Dmg</td>
                    <td>{percent(character.character.stats.critDmg)}</td>
                </tr>
                <tr>
                    <td>Energy Regen</td>
                    <td>{percent(character.character.stats.energyRecharge)}</td>
                </tr>
                <tr>
                    <td>Resonance Skill DMG Bonus</td>
                    <td>{percent(character.character.stats.moveDmg[MoveType.Skill])}</td>
                </tr>
                <tr>
                    <td>Basic Attack DMG Bonus</td>
                    <td>{percent(character.character.stats.moveDmg[MoveType.Basic])}</td>
                </tr>
                <tr>
                    <td>Heavy Attack DMG Bonus</td>
                    <td>{percent(character.character.stats.moveDmg[MoveType.Heavy])}</td>
                </tr>
                <tr>
                    <td>Resonance Liberation DMG Bonus</td>
                    <td>{percent(character.character.stats.moveDmg[MoveType.Liberation])}</td>
                </tr>
                <tr>
                    <td>Glacio DMG Bonus</td>
                    <td>{percent(character.character.stats.elementDmg[MoveElement.Glacio])}</td>
                </tr>
                <tr>
                    <td>Fusion DMG Bonus</td>
                    <td>{percent(character.character.stats.elementDmg[MoveElement.Fusion])}</td>
                </tr>
                <tr>
                    <td>Electro DMG Bonus</td>
                    <td>{percent(character.character.stats.elementDmg[MoveElement.Electro])}</td>
                </tr>
                <tr>
                    <td>Aero DMG Bonus</td>
                    <td>{percent(character.character.stats.elementDmg[MoveElement.Aero])}</td>
                </tr>
                <tr>
                    <td>Spectro DMG Bonus</td>
                    <td>{percent(character.character.stats.elementDmg[MoveElement.Spectro])}</td>
                </tr>
                <tr>
                    <td>Havoc DMG Bonus</td>
                    <td>{percent(character.character.stats.elementDmg[MoveElement.Havoc])}</td>
                </tr>
                <tr>
                    <td>Healing Bonus</td>
                    <td>{percent(character.character.stats.healingBonus)}</td>
                </tr>
    
            </tbody>
        </table>
    </div>
</div>