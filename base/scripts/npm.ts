// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

await emptyDir("./npm");

await build({
  typeCheck: false,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "pheasant-router",
    version: "0.1.1",
    description: "The JavaScript implementation of the Pheasant Routing Package used in routing Pheasant Packages",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/pheasantframework/routing",
    },
    bugs: {
      url: "https://github.com/pheasantframework/routing/issues",
    },
    devDependencies: {
      "webpack": ">=5.90.0",
      "webpack-cli": ">=5.1.0",
      "terser-webpack-plugin": ">=5.3.0",
      "typescript": "^5.3.3",
      "ts-loader": "^9.5.1",
      "@deno/shim-deno": ">=0.19.0",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    Deno.copyFileSync("CHANGELOG.md", "npm/CHANGELOG.md");
    Deno.copyFileSync("tsconfig.json", "npm/tsconfig.json");
    Deno.copyFileSync("webpack.config.js", "npm/webpack.config.js");
  },
});