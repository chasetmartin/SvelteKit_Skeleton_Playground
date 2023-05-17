<script lang="ts">
    import Currentflowcard from '$lib/components/currentflowcard.svelte';
	// import Currentflowcard2 from '$lib/components/currentflowcard2.svelte';
	// import Currentflowcard3 from '$lib/components/currentflowcard3.svelte';
	// import Currentflowcard4 from '$lib/components/currentflowcard4.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
    // const streamflow = data.streamflow.timeSeries;
    // const formattedData = data.formattedData;
    const chartdata = data.chartdata;

    // const riverName = streamflow.timeSeries[0].sourceInfo.siteName;
    // const flowUnit = streamflow.timeSeries[0].variable.variableDescription;
    // const flowNow = streamflow.timeSeries[0].values[0].value[0].value;
</script>
<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-8">
<Currentflowcard {chartdata}/>
<!-- <Currentflowcard2 {streamflow} {formattedData}/>
<Currentflowcard3 {streamflow} {formattedData}/>
<Currentflowcard4 {streamflow} {formattedData}/> -->
</div>