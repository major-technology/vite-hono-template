/**
 * About page: a second route, with a lazily loaded component in its own chunk.
 */
import { lazy, Suspense } from "react";

const Details = lazy(() => import("../components/Details"));

export function AboutPage() {
	return (
		<section className="flex flex-col gap-6">
			<header>
				<h1 className="text-xl font-semibold tracking-tight">About</h1>
				<p className="text-muted-foreground">This page is rendered client-side. Reload it to check that deep links work.</p>
			</header>
			<Suspense fallback={<p className="text-sm text-muted-foreground">Loading details...</p>}>
				<Details />
			</Suspense>
		</section>
	);
}
