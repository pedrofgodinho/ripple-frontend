<script lang="ts">
	import { onMount } from "svelte";
    import { BACKEND_URI } from "$lib/config";
    import { CharacterStats, MoveElement, MoveType, StatType, exampleStats, type BaseStats, type Echo, type Move, type Stat } from "ripple-calculator";
	import EchoCreator from "$lib/EchoCreator.svelte";
	import { echoes, extraStats, weapon } from "$lib/store";
	import StatSelector from "$lib/StatSelector.svelte";

    /*
    let characters: string = "Waiting for data...";
    onMount(async () => {
        const res = await fetch(`${BACKEND_URI}characters`);
        const data = await res.json();
        characters = data['characters'].join(", ");
    });
    */

    // Jiyan stats at level 70. Should be taken from the backend in the future.
    let baseStats: BaseStats = {hp: 7954, atk: 343, def: 899};
    let stats: CharacterStats = new CharacterStats(baseStats);
    let move: Move = {element: MoveElement.Aero, moveType: MoveType.Basic, moveMultiplier: 0.5007};

    function addExtraStat() {
        $extraStats = [...$extraStats, {type: StatType.AtkFlat, value: 0}];
    }

    function removeExtraStat() {
        $extraStats = $extraStats.slice(0, $extraStats.length - 1);
    }

    // Update stats when anything changes
    $: {
        stats = new CharacterStats(baseStats);
        for (let i = 0; i < 5; i++) {
            stats.addEcho($echoes[i]);
        }
        stats.addEcho($weapon);
        for (let i = 0; i < $extraStats.length; i++) {
            stats.addStat($extraStats[i]);
        }

    }

    function round(num: number, places: number = 2): number {
        return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
    }
</script>

<table>
    <tr>
        {#each Array(5).keys() as i}
        <td>
            <h1>Echo {i + 1}</h1>
            <EchoCreator bind:echo={$echoes[i]}/>
        </td>
        {/each}
</table>

<h1>Weapon</h1>
<EchoCreator bind:echo={$weapon} substatLabel="Passive"/>

<h1>Extra Stats</h1>
{#each $extraStats as stat, i}
    <StatSelector label="Extra Stat {i+1}:" bind:stat={stat} />
<br/>
{/each}

<button on:click={addExtraStat}>Add Extra Stat</button>
<button on:click={removeExtraStat}>Remove Extra Stat</button>

<h1>Stats</h1>
<p>
    Atk: {stats.getAtk()} <br/>
    Def: {stats.getDef()} <br/>
    HP: {stats.getHp()} <br/>
    Crit Rate: {stats.critRate * 100 + "%"} <br/>
    Crit Damage: {stats.critDmg * 100 + "%"} <br/>
    Elemental Damages: {stats.elementDmg.map((e) => e * 100 + "%").join(", ")} <br/>
    Physical Damage: {stats.moveDmg.map((e) => e * 100 + "%").join(", ")} <br/>
</p>
<h1>Damage</h1>
<table>
    <tr>
        <td></td>
        <td>Non-crit</td>
        <td>Crit</td>
        <td>Avg</td>
    </tr>
    <tr>
        <td style="padding: 0 15px 0 15px">No Defense</td>
        <td style="padding: 0 15px 0 15px">{round(stats.getMoveBaseDmg(move))}</td>
        <td style="padding: 0 15px 0 15px">{round(stats.getMoveBaseDmgCrit(move))}</td>
        <td style="padding: 0 15px 0 15px">{round(stats.getMoveBaseDmgAvg(move))}</td>
    </tr>
    {#each Array(11).keys() as i}
    <tr>
        <td style="padding: 0 15px 0 15px">Level {60+i}</td>
        <td style="padding: 0 15px 0 15px">{round(stats.getMoveDmg(move, 70, 60+i))}</td>
        <td style="padding: 0 15px 0 15px">{round(stats.getMoveDmgCrit(move, 70, 60+i))}</td>
        <td style="padding: 0 15px 0 15px">{round(stats.getMoveDmgAvg(move, 70, 60+i))}</td>
    </tr>
    {/each}
</table>


<h2>Raw Stats</h2>
<p>{JSON.stringify(stats)}</p>
