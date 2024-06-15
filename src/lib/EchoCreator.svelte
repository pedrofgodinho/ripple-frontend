<script lang=ts>
    import { createEventDispatcher } from "svelte";
    import { StatType, type Echo } from "ripple-calculator";
	import StatSelector from "./StatSelector.svelte";

    export let echo: Echo = {cost: 0, mainStat: {type: StatType.AtkPercent, value: 0}, secondaryStat: {type: StatType.AtkPercent, value: 0}, substats: []};
    export let firstLabel = "Main Stat:";
    export let secondLabel = "Secondary Stat:";
    export let substatLabel = "Substat";
    echo = structuredClone(echo); // Make sure it's a new object
    
    function addSubstat() {
        echo.substats = [...echo.substats, {type: StatType.AtkFlat, value: 0}];
    }

    function removeSubstat() {
        echo.substats = echo.substats.slice(0, echo.substats.length - 1);
    }
</script>

<div>
    <StatSelector label={firstLabel} bind:stat={echo.mainStat}/>
    <br/>
    <StatSelector label={secondLabel} bind:stat={echo.secondaryStat}/>
    <br/>


    {#each echo.substats as substat, i}
        <StatSelector label="{substatLabel} {i+1}:" bind:stat={substat} />
        <br/>
    {/each}


    <button on:click={addSubstat}>Add {substatLabel}</button>
    <button on:click={removeSubstat}>Remove {substatLabel}</button>
</div>