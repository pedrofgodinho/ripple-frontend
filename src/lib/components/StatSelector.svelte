<script lang=ts>
	import { StatType, type Stat } from "ripple-calculator";

    export let stat: Stat = {type: StatType.AtkPercent, value: 0};

    // Create a list of stat types
    let values: (string|StatType)[] = Object.values(StatType);
    let names: string[] = values.slice(0, values.length / 2) as string[];
    let ids: StatType[] = values.slice(values.length / 2) as StatType[];
    let statTypes: {name: string, id: number}[] = names.map((name, i) => ({name, id: ids[i]}));
</script>

<div class="join">
    <select class="select select-bordered select-primary join-item" bind:value={stat.type}>
        {#each statTypes as statType}
            <option value={statType.id}>{statType.name}</option>
        {/each}
    </select>
    <input class="input input-bordered input-primary join-item" type="number" bind:value={stat.value}/>  
</div>

