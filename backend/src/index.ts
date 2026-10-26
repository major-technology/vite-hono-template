/**
 * Entry point: serves the Hono app on $PORT (3002 by default).
 */
import { serve } from "@hono/node-server";
import { app } from "./app.js";

const port = Number(process.env.PORT) || 3002;

serve({ fetch: app.fetch, port }, (info) => {
	console.log(`backend listening on http://localhost:${info.port}/api`);
});
