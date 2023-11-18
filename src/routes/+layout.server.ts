/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	const units = url.searchParams.get('units');

	return {
		units: units ?? 'standard'
	};
}
