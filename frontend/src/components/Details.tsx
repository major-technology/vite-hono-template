/**
 * Loaded on demand by the About page, so Vite emits it as a separate chunk.
 */
export default function Details() {
	return (
		<div className="rounded-lg border bg-card p-4 text-card-foreground">
			<h2 className="mb-2 font-mono text-sm text-muted-foreground">Stack</h2>
			<ul>
				<li>frontend/: Vite + React single-page app</li>
				<li>backend/: Hono API under /api</li>
				<li>shared/: types used by both</li>
			</ul>
		</div>
	);
}
