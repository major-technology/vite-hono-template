/**
 * Returns the signed-in user. The platform sets `x-major-user-jwt` on every
 * request it forwards; locally, getCurrentUser falls back to MAJOR_JWT_TOKEN.
 */
import { createRoute, z, type OpenAPIHono } from "@hono/zod-openapi";
import { getCurrentUser } from "../lib/auth.js";

const meRoute = createRoute({
	method: "get",
	path: "/me",
	responses: {
		200: {
			description: "The signed-in user",
			content: {
				"application/json": {
					schema: z.object({
						user: z.object({ userId: z.string(), email: z.string(), name: z.string() }),
					}),
				},
			},
		},
	},
});

export function registerMeRoutes(app: OpenAPIHono) {
	app.openapi(meRoute, async (c) => c.json(await getCurrentUser(), 200));
}
