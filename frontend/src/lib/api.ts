/**
 * Fetches JSON from the backend's relative /api URLs.
 */
export async function getJson<T>(url: string): Promise<T> {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`${url} returned ${res.status}`);
	}

	return (await res.json()) as T;
}
