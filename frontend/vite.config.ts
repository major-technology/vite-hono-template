import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Do not set base, build.outDir or build.assetsDir: the platform serves dist/ with Vite's defaults.
export default defineConfig({
	plugins: [react(), tailwindcss()],
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
