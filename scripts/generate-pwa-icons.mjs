import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const svgPath = join(publicDir, "pwa-icon.svg");

const svgBuffer = await readFile(svgPath);

await sharp(svgBuffer).resize(192, 192).png().toFile(join(publicDir, "pwa-192.png"));
await sharp(svgBuffer).resize(512, 512).png().toFile(join(publicDir, "pwa-512.png"));

console.log("Icônes PWA générées depuis pwa-icon.svg → pwa-192.png, pwa-512.png");
