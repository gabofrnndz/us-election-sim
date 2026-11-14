# U.S. Election Simulator (GitHub Pages)

A static, no-build web version of the election simulator spreadsheet.

## Deploy
1. Create a GitHub repository and upload these files (`index.html`, `.nojekyll`, `README.md`) to the root.
2. Repo **Settings > Pages** > Source: *Deploy from a branch* > Branch `main` / `(root)` > Save.
3. Open `https://<your-username>.github.io/<repo-name>/`.

## How it works
- **Data Entry**: add contests (level, state, office, total ballots) and candidates (contest, name, party, votes). Everything else is automatic: reporting %, projected winner, margin, status.
- **Dashboard**: filter by level / state / contest; contest card with yellow-framed projected winner; tile map by office; charts.
- **States**: add a state once and it appears on the map, dropdowns, apportionment and districts. PVI is calculated automatically (or override).
- **Apportionment & Districts**: Huntington-Hill seats; the district list rebuilds automatically; district PVI computed from margins or the state estimate.
- **Settings**: per-party swing (what-if), close-call threshold, office list, JSON export/import.

Data is saved in your browser (localStorage). The Mississippi Senate sample comes from a screenshot; President rows are illustrative (approximate margins, fictional candidates); county/city/state/House rows are fictional samples. Populations and margins are approximate - verify before use.

## Updates
- Filters chain Level > State > Jurisdiction > Office > Contest; the office lists (Settings) are per level.
- Projected-winner panel (name, ribbon, +FLIP when the seat changes party; set 'Seat held by' or mark an incumbent).
- Election Laws tab: Electoral College (270, ME/NE, 12th Amendment), plurality/majority/RCV states, recount triggers. Informational; verify with your state election office.
- Fonts: Barlow Condensed + Inter (Google Fonts, needs internet).
