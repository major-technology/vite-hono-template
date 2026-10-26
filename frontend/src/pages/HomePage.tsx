/**
 * Home page: calls the backend through relative /api URLs and shows the results.
 */
import { useEffect, useState } from "react";
import type { HelloResponse, MeResponse } from "shared";

async function getJson<T>(url: string): Promise<T> {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`${url} returned ${res.status}`);
	}

	return (await res.json()) as T;
}

export function HomePage() {
	const [hello, setHello] = useState<HelloResponse>();
	const [me, setMe] = useState<MeResponse>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		Promise.all([getJson<HelloResponse>("/api/hello?name=Major"), getJson<MeResponse>("/api/me")])
			.then(([helloBody, meBody]) => {
				setHello(helloBody);
				setMe(meBody);
			})
			.catch((err: unknown) => setError(String(err)));
	}, []);

	return (
		<section>
			<h1>Your new app</h1>
			{error && <p className="error">{error}</p>}
			<div className="card">
				<h2>GET /api/hello</h2>
				<p>{hello ? hello.message : "Loading..."}</p>
			</div>
			<div className="card">
				<h2>GET /api/me</h2>
				<p>{me ? (me.signedIn ? "You are signed in." : "No signed-in user.") : "Loading..."}</p>
			</div>
		</section>
	);
}
