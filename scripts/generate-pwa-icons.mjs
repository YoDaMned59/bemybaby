import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Jimp } from "jimp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
/** Couleur primaire #8c6adf (ARGB pour Jimp) */
const color = 0xff8c6adf;

async function writeSquare(size, filename) {
  const image = new Jimp({ width: size, height: size, color });
  const buffer = await image.getBuffer("image/png");
  await writeFile(join(publicDir, filename), buffer);
}

await writeSquare(192, "pwa-192.png");
await writeSquare(512, "pwa-512.png");
console.log("Icônes PWA écrites : public/pwa-192.png, public/pwa-512.png");
