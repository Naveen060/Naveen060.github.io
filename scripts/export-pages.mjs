import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDirectory = path.join(projectRoot, "dist", "client");
const workerFile = path.join(projectRoot, "dist", "server", "index.js");
const outputDirectory = path.join(projectRoot, "pages-dist");

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const workerUrl = pathToFileURL(workerFile);
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://naveen060.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

const html = await response.text();
if (!html.includes("Venkata Naveen") || !html.includes("/assets/")) {
  throw new Error("Static render is missing expected portfolio content or assets");
}

await writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");

console.log(`GitHub Pages export ready at ${outputDirectory}`);
