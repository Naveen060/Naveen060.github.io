import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDirectory = path.join(projectRoot, "dist", "client");
const workerFile = path.join(projectRoot, "dist", "server", "index.js");
const outputDirectory = path.join(projectRoot, "pages-dist");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const deploymentDirectory = basePath
  ? path.join(outputDirectory, ...basePath.split("/"))
  : outputDirectory;
const publicUrl = basePath
  ? `https://naveen060.github.io/${basePath}/`
  : "https://naveen060.github.io/";

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(deploymentDirectory, { recursive: true });
await cp(clientDirectory, deploymentDirectory, { recursive: true });

const workerUrl = pathToFileURL(workerFile);
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request(publicUrl, {
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

await writeFile(path.join(deploymentDirectory, "index.html"), html, "utf8");
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");

if (basePath) {
  const escapedUrl = publicUrl.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const redirect = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="refresh" content="0;url=${escapedUrl}">
    <link rel="canonical" href="${escapedUrl}">
    <title>Venkata Naveen Chava - Portfolio</title>
  </head>
  <body>
    <p><a href="${escapedUrl}">Open Venkata Naveen Chava's portfolio</a></p>
    <script>window.location.replace(${JSON.stringify(publicUrl)});</script>
  </body>
</html>`;
  await writeFile(path.join(outputDirectory, "index.html"), redirect, "utf8");
}

console.log(`GitHub Pages export ready for ${publicUrl}`);
