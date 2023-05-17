<script lang="ts">


// export let streamflow: any;
// console.log(streamflow);

	import Sevendaychart from "$lib/components/sevendaychart.svelte";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

  export let chartdata: any;
// console.log(chartdata[0].values[0].value);
// const lastIndex = chartdata.values[0].value.length - 1;
// console.log(lastIndex);


</script>

    {#each chartdata as stream}
    {#if stream.values[0].value.length > 1}
    <div class="card p-4">
        <h2 class="p-2">{stream.sourceInfo.siteName}</h2>
        <div class="p-2">
            <h3 class="badge bg-gradient-to-br variant-gradient-primary-tertiary">Current Flow: </h3> 
            <h3 class="badge variant-filled-warning">{stream.values[0].value.slice(-1)[0].value}</h3>
            <h4 class="badge variant-soft">{stream.variable.variableDescription}</h4>
        </div>
        <div class="p-4">
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="lead"><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 22 22"><g fill="none" stroke="currentColor"><path d="M3 3v18h18"></path><path d="m19 9l-5 5l-4-4l-3 3"></path></g></svg></svelte:fragment>
            <svelte:fragment slot="summary">Seven-Day Flow Chart</svelte:fragment>
            <svelte:fragment slot="content"><Sevendaychart {stream}/></svelte:fragment>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="lead"><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M3 3v18h18m-3-4V9m-5 8V5M8 17v-3"></path></svg></svelte:fragment>
            <svelte:fragment slot="summary">Flow Forecast</svelte:fragment>
            <svelte:fragment slot="content">Coming Soon...</svelte:fragment>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    {/if}
    {/each}
    
