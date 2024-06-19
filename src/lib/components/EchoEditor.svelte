<script lang=ts>
	import StatSelector from "$lib/components/StatSelector.svelte";
    import { StatType, type Echo } from "ripple-calculator";
	import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let echo: Echo = {cost: 0, mainStat: {type: StatType.AtkPercent, value: 0}, secondaryStat: {type: StatType.AtkPercent, value: 0}, substats: []};
    
    function addSubstat() {
        echo.substats = [...echo.substats, {type: StatType.AtkFlat, value: 0}];
    }

    function removeSubstat() {
        echo.substats = echo.substats.slice(0, echo.substats.length - 1);
    }

    function deleteEcho() {
        dispatch("deleteEcho");
    }
</script>

<div class="card shadow-xl w-min bg-neutral m-4">
    <div class="card-body">
        <div class="flex">
            <h2 class="card-title w-full">
                <slot/>
            </h2>
            <button class="btn btn-square btn-sm" on:click={deleteEcho}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        

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
