<script>
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<form method="POST">
		<div>
			<h1>WeatherDock</h1>
		</div>
		<div class="zipCodeSearch">
			<input name="zipCode" value={data.zipCode} />
			<button type="submit">Go</button>
			{#if data.lat && data.lon}
				<div>
					<p>Lat: {data.lat}</p>
					<p>Long: {data.lon}</p>
				</div>
			{/if}
		</div>
		<div class="currentWeatherInfoBlock">
			<div>
				<h3>Temperature</h3>
				<p>This is a test</p>
			</div>
			<div class="verticalLine" />
			<div>
				<h3>Wind</h3>
			</div>
			<div class="verticalLine" />
			<div>
				<h3>Humidity</h3>
			</div>
		</div>
		<select name="units" value={data.units}>
			<option value="celsius">°C</option>
			<option value="fahrenheit" selected>°F</option>
		</select>
		{#if form?.success}
			<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
			<p>Successfully</p>
		{/if}
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	.zipCodeSearch {
		display: flex;
		gap: 1em;
		justify-content: center;
	}
	.verticalLine {
		border-left: 1px solid gray;
		margin: 1em 0;
	}
	.currentWeatherInfoBlock {
		display: flex;
		gap: 2em;
	}
</style>
