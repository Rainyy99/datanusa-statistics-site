// DataNusa — main.ts
// Menyerahkan situs: menyalin app/ dan screenshots/ dari repositori ini ke
// direktori output, lalu menulis dossier.json dengan buildDossier dari
// vendor/makefun-frontend.ts (salinan kit, tidak diubah).
// Dijalankan dua kali oleh grader; kedua run menulis byte yang sama.

import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function handIn(): void {
  mkdirSync(outDir, { recursive: true });
  for (const name of ["app", "screenshots", "dossier.json"]) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
  cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });
  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
    app_path_max_bytes: 1000,
  });
  writeFileSync(join(outDir, "dossier.json"), dossier);
  console.log("DataNusa handed in: app/ + screenshots/ + dossier.json (" + dossier.length + " bytes)");
}

handIn();
