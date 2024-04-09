import * as esbuild from "esbuild";
import { typecheckPlugin } from "@jgoz/esbuild-plugin-typecheck";

await esbuild.build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	platform: "node",
	target: "node18",
	outfile: "action/index.js",
	sourcemap: 'inline',
	plugins: [typecheckPlugin()]
});