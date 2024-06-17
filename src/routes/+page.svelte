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

    function roundPercent(num: number): string {
        return round(num * 100) + "%";
    }
</script>

<main class="container-fluid">
    <h1>Ripple Calculator</h1>
    <hr/>
    <details>
        <summary role="button" class="outline">Echoes</summary>
        <div class="grid">
            <EchoCreator bind:echo={$echoes[0]}/>
            <EchoCreator bind:echo={$echoes[1]}/>
        </div>
        <div class="grid">
            <EchoCreator bind:echo={$echoes[2]}/>
            <EchoCreator bind:echo={$echoes[3]}/>
        </div>
        <div class="container">
            <EchoCreator bind:echo={$echoes[4]}/>
        </div>
    </details>            
    
    <details>
        <summary role="button" class="outline">Weapon</summary>
        <EchoCreator bind:echo={$weapon} substatLabel="Passive"/>
    </details>

    <details>
        <summary role="button" class="outline">Extra Stats</summary>
        {#each $extraStats as stat, i}
            <StatSelector bind:stat={stat} />
        {/each}
        <div role="group">
            <button aria-current="true" on:click={addExtraStat}>Add Extra Stat</button>
            <button on:click={removeExtraStat}>Remove Extra Stat</button>    
        </div>
    </details>
        
    <details>
        <summary role="button" class="outline">Calcs</summary>
        <div class="grid">
            <div>
                <h3>Character Stats</h3>
                <table>
                    <tr>
                        <td>Stat</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>Base Atk</td>
                        <td>{round(stats.getAtk())}</td>
                    </tr>
                    <tr>
                        <td>Base Def</td>
                        <td>{round(stats.getDef())}</td>
                    </tr>
                    <tr>
                        <td>Base HP</td>
                        <td>{round(stats.getHp())}</td>
                    </tr>
                    <tr>
                        <td>Crit Rate</td>
                        <td>{roundPercent(stats.critRate)}</td>
                    </tr>
                    <tr>
                        <td>Crit Damage</td>
                        <td>{roundPercent(stats.critDmg)}</td>
                    </tr>
                    <tr>
                        <td>Elemental Damages</td>
                        <td>{stats.elementDmg.map((e) => roundPercent(e)).join(", ")}</td>
                    </tr>
                    <tr>
                        <td>Move Damages</td>
                        <td>{stats.moveDmg.map((e) => roundPercent(e)).join(", ")}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h3>
                    Basic Attack 1 Damage
                </h3>
                <table>
                    <tr>
                        <td></td>
                        <td>Non-crit</td>
                        <td>Crit</td>
                        <td>Avg</td>
                    </tr>
                    <tr>
                        <td>No Defense</td>
                        <td>{round(stats.getMoveBaseDmg(move))}</td>
                        <td>{round(stats.getMoveBaseDmgCrit(move))}</td>
                        <td>{round(stats.getMoveBaseDmgAvg(move))}</td>
                    </tr>
                    {#each Array(11).keys() as i}
                    <tr>
                        <td>Level {60+i}</td>
                        <td>{round(stats.getMoveDmg(move, 70, 60+i))}</td>
                        <td>{round(stats.getMoveDmgCrit(move, 70, 60+i))}</td>
                        <td>{round(stats.getMoveDmgAvg(move, 70, 60+i))}</td>
                    </tr>
                    {/each}
                </table>  
            </div>
        </div>
    
    </details>
    
    <hr/>
    
    <h2>Raw Stats</h2>
    <p>{JSON.stringify(stats)}</p>
    
</main>
