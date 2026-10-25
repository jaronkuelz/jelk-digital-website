# JELK Digital – Website

- Läuft über GitHub Pages unter https://jelkdigital.de (Branch `main`, Ordner `/`).
- Zusätzlich lädt jede Änderung auf `main` die Seite per FTP auf den alten Webspace (`.github/workflows/upload.yml`, dort mit .htaccess-Passwort).

## Passwortschutz (StatiCrypt)

- Ausnahme: die Beispiel-Vorschauen in `beispiele/` (Café, Restaurant, Modern/Bistro) sind **ohne Passwort** offen.
- Alle anderen HTML-Seiten im Repo sind **verschlüsselt** – das Repo ist öffentlich, die lesbaren Seiten liegen nur lokal in `quelle/` (steht in `.gitignore`).
- **Seiten ändern:** immer in `quelle/` bearbeiten, nie die verschlüsselten Dateien im Hauptordner.
- **Danach verschlüsseln:** `node verschluesseln.mjs` → Passwort eingeben → committen und pushen.
- Immer dasselbe Passwort nehmen, sonst gilt „Angemeldet bleiben“ nicht für alle Seiten.
- `.staticrypt.json` enthält nur das Salt (kein Geheimnis) und muss im Repo bleiben.
- `robots.txt` sperrt Suchmaschinen.
- Bilder und Schriften sind nicht verschlüsselt (per direktem Link abrufbar).
- `quelle/` gibt es nur auf diesem PC → regelmäßig sichern.
