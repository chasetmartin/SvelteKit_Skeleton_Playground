<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    type State = {
        name: string;
    };

    const searchStates: State[] = data.states;

    const searchStore = createSearchStore(searchStates);

    const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

    onDestroy(() => {
        unsubscribe();
    });

</script>

<div class="container p-8">
    <h1>Search/Filter</h1>
    <input type="search" placeholder="Search..." bind:value={$searchStore.search} />
</div>

<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each $searchStore.filtered as state }
        <div class="card p-4">
            <h2>{state.name}</h2>
        </div>
    {/each}
</div>
<!-- <pre>{JSON.stringify($searchStore.filtered, null, 2)}</pre> -->