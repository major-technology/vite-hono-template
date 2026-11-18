import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Do not set base, build.outDir or build.assetsDir: the platform serves dist/ with Vite's defaults.
export default defineConfig({
	// tanstackRouter must come before react(): it generates src/routeTree.gen.ts from src/routes/ and code-splits each page.
	plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react(), tailwindcss()],
	resolve: {
		alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
	},
	server: {
		port: Number(process.env.PORT) || 5173,
		strictPort: true,
		host: true,
		allowedHosts: true,
		proxy: {
			"/api": {
				target: `http://localhost:${process.env.BACKEND_PORT || 3002}`,
				changeOrigin: false,
			},
		},
	},
});
