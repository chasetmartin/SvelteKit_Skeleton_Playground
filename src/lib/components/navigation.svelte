<script lang="ts">
	import { Accordion, AccordionItem, drawerStore } from "@skeletonlabs/skeleton";
	import { each } from "svelte/internal";

    function drawerClose(): void {
        drawerStore.close();
    }

    const states = [
          {"name": "Alabama"},
          {"name": "Alaska"},
          {"name": "Arizona"},
          {"name": "Arkansas"},
          {"name": "California"},
          {"name": "Colorado"},
          {"name": "Connecticut"},
          {"name": "Delaware"},
          {"name": "Florida"},
          {"name": "Georgia"},
          {"name": "Hawaii"},
          {"name": "Idaho"},
          {"name": "Illinois"},
          {"name": "Indiana"},
          {"name": "Iowa"},
          {"name": "Kansas"},
          {"name": "Kentucky"},
          {"name": "Louisiana"},
          {"name": "Maine"},
          {"name": "Maryland"},
          {"name": "Massachusetts"},
          {"name": "Michigan"},
          {"name": "Minnesota"},
          {"name": "Mississippi"},
          {"name": "Missouri"},
          {"name": "Montana"},
          {"name": "Nebraska"},
          {"name": "Nevada"},
          {"name": "New Hampshire"},
          {"name": "New Jersey"},
          {"name": "New Mexico"},
          {"name": "New York"},
          {"name": "North Carolina"},
          {"name": "North Dakota"},
          {"name": "Ohio"},
          {"name": "Oklahoma"},
          {"name": "Oregon"},
          {"name": "Pennsylvania"},
          {"name": "Rhode Island"},
          {"name": "South Carolina"},
          {"name": "South Dakota"},
          {"name": "Tennessee"},
          {"name": "Texas"},
          {"name": "Utah"},
          {"name": "Vermont"},
          {"name": "Virginia"},
          {"name": "Washington"},
          {"name": "West Virginia"},
          {"name": "Wisconsin"},
          {"name": "Wyoming"}
        ]
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={drawerClose}>Home</a></li>
        <li><a href="/about" on:click={drawerClose}>About</a></li>
        <li><a href="/popular" data-sveltekit-preload-data on:click={drawerClose}>Popular Rivers</a></li>
        <li>
            <Accordion>
                <AccordionItem>
                  <svelte:fragment slot="lead"></svelte:fragment>
                  <svelte:fragment slot="summary">By State:</svelte:fragment>
                  <svelte:fragment slot="content">
                    
                    <ul>
                    {#each states as state }
                        <li><a href="/state/{state.name.toLocaleLowerCase()}" on:click={drawerClose}>{state.name}</a></li>
                    {/each}
                    </ul>
                  </svelte:fragment>
                </AccordionItem>
              </Accordion>
        </li>
    </ul>
</nav>