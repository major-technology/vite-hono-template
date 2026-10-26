/**
 * Home page: calls the backend through relative /api URLs and shows the results.
 */
import { useEffect, useState } from "react";
import type { CurrentUserResponse, HelloResponse } from "shared";

async function getJson<T>(url: string): Promise<T> {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`${url} returned ${res.status}`);
	}

	return (await res.json()) as T;
}

export function HomePage() {
	const [hello, setHello] = useState<HelloResponse>();
	const [me, setMe] = useState<CurrentUserResponse>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		Promise.all([getJson<HelloResponse>("/api/hello?name=Major"), getJson<CurrentUserResponse>("/api/me")])
			.then(([helloBody, meBody]) => {
				setHello(helloBody);
				setMe(meBody);
			})
			.catch((err: unknown) => setError(String(err)));
	}, []);

	return (
		<section className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold">Your new app</h1>
			{error && <p className="text-destructive">{error}</p>}
			<div className="rounded-lg border bg-card p-4 text-card-foreground">
				<h2 className="mb-2 font-mono text-sm text-muted-foreground">GET /api/hello</h2>
				<p>{hello ? hello.message : "Loading..."}</p>
			</div>
			<div className="rounded-lg border bg-card p-4 text-card-foreground">
				<h2 className="mb-2 font-mono text-sm text-muted-foreground">GET /api/me</h2>
				<p>{me ? `${me.user.name} (${me.user.email})` : "Loading..."}</p>
			</div>
		</section>
	);
}
