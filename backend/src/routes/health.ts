/**
 * Health check the platform probes. Keep it.
 */
import { createRoute, z, type OpenAPIHono } from "@hono/zod-openapi";

const healthzRoute = createRoute({
	method: "get",
	path: "/healthz",
	responses: {
		200: {
			description: "The backend is up",
			content: { "application/json": { schema: z.object({ ok: z.literal(true) }) } },
		},
	},
});

export function registerHealthRoutes(app: OpenAPIHono) {
	app.openapi(healthzRoute, (c) => c.json({ ok: true as const }, 200));
}
