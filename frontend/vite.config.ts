import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Do not set base, build.outDir or build.assetsDir: the platform serves dist/ with Vite's defaults.
export default defineConfig({
	plugins: [react()],
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
