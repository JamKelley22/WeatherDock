import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { OPENWEATHERMAP_API_KEY } from '$env/static/private';

export const load = (async ({ cookies, url }) => {
	// const game = new Game(cookies.get('sverdle'));
	// return {
	// 	/**
	// 	 * The player's guessed words so far
	// 	 */
	// 	guesses: game.guesses,
	// 	/**
	// 	 * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
	// 	 * an exact match, and 'c' means a close match (right letter, wrong place)
	// 	 */
	// 	answers: game.answers,
	// 	/**
	// 	 * The correct answer, revealed if the game is over
	// 	 */
	// 	answer: game.answers.length >= 6 ? game.answer : null
	// };
	const zipCode = url.searchParams.get('zipCode');
	const units = url.searchParams.get('units');
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');

	return {
		zipCode,
		units: units ?? 'standard',
		lat,
		lon
	};
}) satisfies PageServerLoad;

export const actions = {
	// /**
	//  * Modify game state in reaction to a keypress. If client-side JavaScript
	//  * is available, this will happen in the browser instead of here
	//  */
	// update: async ({ request, cookies }) => {
	// 	const game = new Game(cookies.get('sverdle'));
	// 	const data = await request.formData();
	// 	const key = data.get('key');
	// 	const i = game.answers.length;
	// 	if (key === 'backspace') {
	// 		game.guesses[i] = game.guesses[i].slice(0, -1);
	// 	} else {
	// 		game.guesses[i] += key;
	// 	}
	// 	cookies.set('sverdle', game.toString());
	// },
	// /**
	//  * Modify game state in reaction to a guessed word. This logic always runs on
	//  * the server, so that people can't cheat by peeking at the JavaScript
	//  */
	default: async ({ request, cookies, url }) => {
		console.log('search');
		let zipCode = url.searchParams.get('zipCode');
		if (!zipCode) {
			throw error(400, {
				message: 'No zip code provided'
			});
		}
		let units = url.searchParams.get('units');
		if (!units) {
			throw error(400, {
				message: 'No units provided'
			});
		}

		const geocodingDataRes = await fetch(
			`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${OPENWEATHERMAP_API_KEY}`
		);
		const geocodingData = await geocodingDataRes.json();
		const { zip, name, lat, lon, country } = geocodingData;
		// console.log(geocodingData);

		const weatherRes = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`
		);
		const weatherDataRes = await weatherRes.json();
		if (weatherDataRes.cod && weatherDataRes.cod !== 200) {
			throw error(500, {
				message: 'Error fetching weather data'
			});
		}
		console.log(weatherDataRes.units);
		const { dt, sunrise, sunset, temp } = weatherDataRes.current;

		return {
			success: true,
			lat,
			lon,
			zipCode,
			units: units ?? 'standard'
		};

		// const game = new Game(cookies.get('sverdle'));
		// const data = await request.formData();
		// const guess = data.getAll('guess') as string[];
		// if (!game.enter(guess)) {
		// 	return fail(400, { badGuess: true });
		// }
		// cookies.set('sverdle', game.toString());
	}
	// restart: async ({ cookies }) => {
	// 	cookies.delete('sverdle');
	// }
} satisfies Actions;
