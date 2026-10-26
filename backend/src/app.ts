/**
 * The backend's Hono app. Every route lives under /api and is registered here.
 */
import { OpenAPIHono } from "@hono/zod-openapi";
import { contextStorage } from "hono/context-storage";
import { registerHealthRoutes } from "./routes/health.js";
import { registerHelloRoutes } from "./routes/hello.js";
import { registerMeRoutes } from "./routes/me.js";

export const app = new OpenAPIHono().basePath("/api");

app.use(contextStorage());

registerHealthRoutes(app);
registerHelloRoutes(app);
registerMeRoutes(app);

app.doc31("/openapi.json", {
	openapi: "3.1.0",
	info: { title: "App API", version: "1.0.0" },
});

export type App = typeof app;
