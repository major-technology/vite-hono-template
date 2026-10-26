/**
 * Example route: greets the caller by name.
 */
import { createRoute, z, type OpenAPIHono } from "@hono/zod-openapi";
import type { HelloResponse } from "shared";

const helloRoute = createRoute({
	method: "get",
	path: "/hello",
	request: {
		query: z.object({ name: z.string().optional() }),
	},
	responses: {
		200: {
			description: "A greeting",
			content: { "application/json": { schema: z.object({ message: z.string() }) } },
		},
	},
});

export function registerHelloRoutes(app: OpenAPIHono) {
	app.openapi(helloRoute, (c) => {
		const { name } = c.req.valid("query");
		const body: HelloResponse = { message: `Hello, ${name || "world"}!` };

		return c.json(body, 200);
	});
}
