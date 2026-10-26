import { defineConfig } from "tsup";

// Bundles src/index.ts into dist/index.js. Packages in "dependencies" stay external
// (installed by `pnpm deploy --prod`); devDependencies such as the workspace `shared`
// package are bundled in, so dist runs without them.
export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	platform: "node",
	target: "node22",
	clean: true,
});
