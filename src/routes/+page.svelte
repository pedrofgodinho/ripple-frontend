<script lang="ts">
	import { onMount } from "svelte";
    import { BACKEND_URI } from "$lib/config";
    import { type Stats, exampleStats } from "ripple-calculator";

    let characters: string = "Waiting for data...";
    let stats: Stats = exampleStats();

    onMount(async () => {
        const res = await fetch(`${BACKEND_URI}characters`);
        const data = await res.json();
        characters = data['characters'].join(", ");
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Backend: {BACKEND_URI}</p>
<p>Characters: {characters}</p>
<p>Example Stats: {JSON.stringify(stats)}</p>