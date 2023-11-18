import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { OPENWEATHERMAP_API_KEY } from '$env/static/private';

async function doTheThing(url: URL, units: string = 'standard', zipCode: string) {
	const geocodingDataRes = await fetch(
		`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${OPENWEATHERMAP_API_KEY}`
	);
	const geocodingData = await geocodingDataRes.json();
	const { name, lat, lon } = geocodingData;

	const weatherRes = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHERMAP_API_KEY}`
	);
	const weatherDataRes = await weatherRes.json();
	if (weatherDataRes.cod && weatherDataRes.cod !== 200) {
		throw error(500, {
			message: 'Error fetching weather data'
		});
	}

	const { dt, sunrise, sunset, temp, humidity, wind_speed, wind_deg, weather } =
		weatherDataRes.current;

	return {
		success: true,
		name,
		lat,
		lon,
		zipCode,
		units,
		dt,
		sunrise,
		sunset,
		temp,
		humidity,
		wind_speed,
		wind_deg,
		weather
	};
}

export const load = (async ({ cookies, url }) => {
	const zipCode = url.searchParams.get('zipCode');

	if (!zipCode) {
		throw error(400, {
			message: 'No zip code provided'
		});
	}
	const units = url.searchParams.get('units');
	if (!zipCode) {
		throw error(400, {
			message: 'No units provided'
		});
	}
	return doTheThing(url, units ?? undefined, zipCode);
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies, url }) => {
		const zipCode = url.searchParams.get('zipCode');

		if (!zipCode) {
			throw error(400, {
				message: 'No zip code provided'
			});
		}
		const units = url.searchParams.get('units');
		if (!zipCode) {
			throw error(400, {
				message: 'No units provided'
			});
		}
		return doTheThing(url, units ?? undefined, zipCode);
	}
} satisfies Actions;
