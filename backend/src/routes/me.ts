/**
 * Reports whether the request carries a signed-in user. The platform sets
 * `x-major-user-jwt` on every request it forwards; it may be absent locally.
 */
import { createRoute, z, type OpenAPIHono } from "@hono/zod-openapi";
import type { MeResponse } from "shared";

const meRoute = createRoute({
	method: "get",
	path: "/me",
	responses: {
		200: {
			description: "Whether a user is signed in",
			content: { "application/json": { schema: z.object({ signedIn: z.boolean() }) } },
		},
	},
});

export function registerMeRoutes(app: OpenAPIHono) {
	app.openapi(meRoute, (c) => {
		const body: MeResponse = { signedIn: Boolean(c.req.header("x-major-user-jwt")) };

		return c.json(body, 200);
	});
}
