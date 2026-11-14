# US Electoral Simulator (USES)
Educational, browser-only election simulator. All data is fictional. Not an official election or voter registration system.

## Deploy on GitHub Pages
1. Create a repository and upload the contents of this folder (index.html, css/, js/, .nojekyll).
2. Settings > Pages > Deploy from branch > main, folder /(root).
3. Open the published URL. Data saves in the browser (LocalStorage); use Settings > Export JSON to back up.

## Modules (js/, loaded in this order)
core.js (state, states and electoral votes, eligibility, routing), voters.js (Voter Index), candidates.js (parties, candidates), laws.js (law reference and rule engine), elections.js (ballots, tabulation, results, Electoral College, map), finance.js (campaign finance), ui.js (audit, settings, startup).

## Legal rules
No state rules are preloaded. Add rules under Election Laws with an official source. Only VERIFIED rules (URL plus date) change method, primary type or voter ID behavior.
