<script lang=ts>
    import { createEventDispatcher } from "svelte";
    import { StatType, type Echo } from "ripple-calculator";
	import StatSelector from "./StatSelector.svelte";

    export let echo: Echo = {cost: 0, mainStat: {type: StatType.AtkPercent, value: 0}, secondaryStat: {type: StatType.AtkPercent, value: 0}, substats: []};
    echo = structuredClone(echo); // Make sure it's a new object
    
    function addSubstat() {
        echo.substats = [...echo.substats, {type: StatType.AtkFlat, value: 0}];
    }

    function removeSubstat() {
        echo.substats = echo.substats.slice(0, echo.substats.length - 1);
    }
</script>

<article>
    <h4>Main Stat</h4>
    <StatSelector bind:stat={echo.mainStat}/>
    <h4>Secondary Stat</h4>
    <StatSelector bind:stat={echo.secondaryStat}/>


    <h4>Substats</h4>
    {#each echo.substats as substat, i}
        <StatSelector bind:stat={substat} />
    {/each}

    <div role="group">
        <button aria-current="true" on:click={addSubstat}>Add stat</button>
        <button on:click={removeSubstat}>Remove stat</button>    
    </div>
</article>