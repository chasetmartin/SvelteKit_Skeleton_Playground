<script>
    /**
	 * @type {any}
	 */
     export let flowNow;
    /**
	 * @type {any}
	 */
     export let flowUnit;
      /**
	 * @type {any}
	 */
     export let riverName;
</script>
<div class="card p-4">
    <h1 class="p-2">Current Flow</h1>
    <h2 class="p-2">{riverName}</h2>
    <h3 class="p-2">
        Current Flow: {flowNow}
    </h3>
    <h4 class="p-1">
        {flowUnit}
    </h4>
</div>