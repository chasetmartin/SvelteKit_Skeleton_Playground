<script lang="ts">
    import Currentflowcard from '$lib/components/currentflowcard.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
    const streamflow = data.streamflow;
    const riverName = streamflow.timeSeries[0].sourceInfo.siteName;
    const flowUnit = streamflow.timeSeries[0].variable.variableDescription;
    const flowNow = streamflow.timeSeries[0].values[0].value[0].value;
    // console.log(streamflow);
    // console.log(flowNow);
    // console.log(flowUnit);
    // console.log(riverName);
</script>
<Currentflowcard {flowNow} {flowUnit} {riverName}/>