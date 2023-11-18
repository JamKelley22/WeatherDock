<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	let zipCode = data.zipCode || '';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>
		<div>
			<h1>WeatherDock</h1>
		</div>
		<div class="zipCodeSearch">
			<input
				name="zipCode"
				bind:value={zipCode}
				on:input={() => {
					$page.url.searchParams.set('zipCode', zipCode);
					goto(`?${$page.url.searchParams.toString()}`);
				}}
			/>
			{#if data.zipCode}
				<div>
					<p>Location: {data.name}</p>
				</div>
			{/if}
		</div>
		<img alt="Weather Icon" />
		<div class="currentWeatherInfoBlock">
			<div>
				<h3>Temperature</h3>

				{#if form?.success}
					<p>{form.temp}</p>
				{:else}
					<p>{data.temp}</p>
				{/if}
			</div>
			<div class="verticalLine" />
			<div>
				<h3>Wind</h3>
				{#if form?.success}
					<p>{form.wind_speed}</p>
				{:else}
					<p>{data.wind_speed}</p>
				{/if}
			</div>
			<div class="verticalLine" />
			<div>
				<h3>Humidity</h3>
				{#if form?.success}
					<p>{form.humidity}%</p>
				{:else}
					<p>{data.humidity}%</p>
				{/if}
			</div>
		</div>
	</div>
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
		flex-direction: column;
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
