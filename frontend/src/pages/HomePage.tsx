/**
 * Home page: a greeting from the backend and an empty area to build in.
 */
import { useEffect, useState } from "react";
import type { HelloResponse } from "shared";
import { getJson } from "../lib/api";

export function HomePage() {
	const [hello, setHello] = useState<HelloResponse>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		getJson<HelloResponse>("/api/hello?name=Major")
			.then(setHello)
			.catch((err: unknown) => setError(String(err)));
	}, []);

	return (
		<section className="flex flex-1 flex-col gap-6">
			<header>
				<h1 className="text-xl font-semibold tracking-tight">Home</h1>
				{error ? (
					<p className="text-destructive">{error}</p>
				) : (
					<p className="text-muted-foreground">{hello ? hello.message : "Loading..."}</p>
				)}
			</header>
			<div className="grid flex-1 place-items-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
				<p>
					Your content goes here.
					<br />
					<span className="font-mono">frontend/src/pages/HomePage.tsx</span>
				</p>
			</div>
		</section>
	);
}
