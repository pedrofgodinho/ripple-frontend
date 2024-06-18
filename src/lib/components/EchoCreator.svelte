<script lang=ts>
	import StatSelector from "$lib/components/StatSelector.svelte";
    import { StatType, type Echo } from "ripple-calculator";

    export let echo: Echo = {cost: 0, mainStat: {type: StatType.AtkPercent, value: 0}, secondaryStat: {type: StatType.AtkPercent, value: 0}, substats: []};
    echo = structuredClone(echo); // Make sure it's a new object
    
    function addSubstat() {
        echo.substats = [...echo.substats, {type: StatType.AtkFlat, value: 0}];
    }

    function removeSubstat() {
        echo.substats = echo.substats.slice(0, echo.substats.length - 1);
    }
</script>

<div class="card shadow-xl w-min bg-neutral m-4">
    <div class="card-body">
        <h2 class="card-title">
            <slot/>
        </h2>

        <div class="flex">
            <h1 class="text-lg flex-1">Cost</h1>
            <select bind:value={echo.cost} class="select select-bordered select-primary flex-1">
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
        </div>
        <h1 class="text-lg">Main Stat</h1>
        <StatSelector bind:stat={echo.mainStat}/>
        <h1 class="text-lg">Secondary Stat</h1>
        <StatSelector bind:stat={echo.secondaryStat}/>
        
        
        <h1 class="text-lg">Substats</h1>
        <div>
            {#each echo.substats as substat, i}
                <StatSelector bind:stat={substat}/>
            {/each}
        </div>
        
        <div class="join flex">
            <button class="btn btn-primary join-item flex-auto" on:click={addSubstat}>Add stat</button>
            <button class="btn btn-secondary join-item flex-14" on:click={removeSubstat}>Remove stat</button>    
        </div>    
    </div>
</div>
