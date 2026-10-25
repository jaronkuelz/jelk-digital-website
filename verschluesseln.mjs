// Verschlüsselt alle HTML-Seiten aus quelle/ mit StatiCrypt und legt sie an die gleiche Stelle im Repo.
// Aufruf (im Ordner der Website):  node verschluesseln.mjs
// Das Passwort wird abgefragt (oder aus der Umgebungsvariable STATICRYPT_PASSWORD gelesen) und nie gespeichert.
// quelle/ steht in .gitignore – die lesbaren Seiten kommen so nie ins öffentliche Repo.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

if (!existsSync("quelle")) {
  console.error("Ordner quelle/ fehlt – hier liegen die lesbaren Seiten.");
  process.exit(1);
}

const ziel = mkdtempSync(join(tmpdir(), "jelk-"));
const args = [
  "-y", "staticrypt@3.5.4", "quelle", "-r", "-d", ziel,
  "--remember", "30", "--short",
  "--template-title", "JELK Digital – geschützt",
  "--template-instructions", "Diese Seite ist noch nicht öffentlich.",
  "--template-placeholder", "Passwort",
  "--template-button", "Öffnen",
  "--template-remember", "Angemeldet bleiben (30 Tage)",
  "--template-error", "Falsches Passwort",
  "--template-toggle-show", "Passwort zeigen",
  "--template-toggle-hide", "Passwort verbergen",
  "--template-color-primary", "#1f2a24",
  "--template-color-secondary", "#f4f1ea",
];
const lauf = spawnSync("npx", args.map((a) => `"${a}"`), { stdio: "inherit", shell: true });
if (lauf.status !== 0) process.exit(lauf.status ?? 1);

// StatiCrypt legt die Dateien unter <ziel>/quelle/ ab → von dort ins Repo kopieren
cpSync(join(ziel, "quelle"), ".", { recursive: true });
rmSync(ziel, { recursive: true, force: true });
console.log("Fertig: verschlüsselte Seiten liegen im Repo. Jetzt committen und pushen.");
