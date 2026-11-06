## Round 1

- **A1** — In `node/frontend/src/pages/Episodes.js`, replaced the single shared episode cache with a 30-second cache keyed by the requested season (including `null` for all seasons). This prevents reusing all-season results for Season 2 immediately after initial load.
- **A2** — In `node/frontend/src/pages/Episodes.js`, tracked the latest load request and gated episode, error, season, and loading state updates on it. Earlier responses can no longer replace the results for the current season selection.
