/**
 * About page: a second route, with a lazily loaded component in its own chunk.
 */
import { lazy, Suspense } from "react";

const Details = lazy(() => import("../components/Details"));

export function AboutPage() {
	return (
		<section>
			<h1>About</h1>
			<p>This page is rendered client-side. Reload it to check that deep links work.</p>
			<Suspense fallback={<p>Loading details...</p>}>
				<Details />
			</Suspense>
		</section>
	);
}
