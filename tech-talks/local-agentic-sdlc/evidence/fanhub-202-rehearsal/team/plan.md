## Round 2

### Cause

`node\frontend\src\pages\Episodes.js:85`, `setEpisodes(episodeCache)`, reuses the single unkeyed cache populated at lines 105-106 for every filter during its 30-second lifetime, so an immediate Season 2 selection displays the initial all-episodes data instead of requesting Season 2.

### Tasks

- **A1 — File:** `node\frontend\src\pages\Episodes.js`. **Change:** Remove the module-level `episodeCache`/`cacheTimestamp`, the 30-second early-return branch, and cache writes; let each filter load use the existing `episodesApi.getAll` call with `{ season_id: seasonId }` for a season and `{}` for all seasons. Preserve both response formats (`response.data.data || response.data`), existing rendering, and season extraction from all-episodes responses. Removing the cache is the smallest correctness fix; do not introduce a cache framework or change the API service. **Test:** Add `node\frontend\src\pages\Episodes.test.js`, with `A1: selecting Season 2 immediately after initial load displays only Season 2 episodes`. Mock the API with distinct Season 1/2 fixtures, resolve initial all episodes, keep `Date.now()` fixed at a nonzero value, click Season 2 without advancing time, assert the second request has Season 2's actual `season_id`, resolve it, and assert only Season 2 episode titles remain after loading ends, without a second click.

- **A2 — File:** `node\frontend\src\pages\Episodes.js`. **Change:** Add an instance-local monotonically increasing request ID using `useRef`; increment and capture it at the start of every `loadEpisodes` call, and check it after awaiting the API before committing episodes or seasons. Guard error updates and the `finally` loading update with the same current-request check. Invalidate outstanding IDs in the initial-load effect's cleanup so an obsolete/unmounted request cannot commit. Request order, not the filter ID alone, determines ownership, including repeated selections of the same filter. **Test:** In `node\frontend\src\pages\Episodes.test.js`, add `A2: an older request cannot overwrite the newer selected season`. After initial all episodes establishes the buttons, use manually controlled promises: click Season 1 then Season 2, resolve Season 2 first and Season 1 last, and assert only Season 2 remains. Include focused A2-named variants where the older request resolves while the newer one is still pending (loading must remain visible) and where the older request rejects (no stale error and no premature loading completion). Do not use sleeps.

- **A3 — File:** `node\frontend\src\pages\Episodes.js`. **Change:** In `handleSeasonClick`, explicitly treat `season === null` as selecting all seasons, alongside clicking the currently selected season to deselect it; set `selectedSeason` to `null` and call `loadEpisodes()` in both cases. This also fixes the existing null dereference: with a season selected, the All Seasons button currently reaches `season.id` at line 136. Keep the full season-button list while viewing a filtered response and continue deriving it only from all-episodes data. **Test:** In `node\frontend\src\pages\Episodes.test.js`, add `A3: returning to All Seasons displays all episodes`. Load all episodes, select and resolve Season 2, click All Seasons, assert the next API call uses `{}`, resolve all episodes, and assert both seasons' episode titles and filter buttons are present. Cover both supported response envelopes across these tests. Include A3-named coverage for deselecting Season 2 by clicking it again and clicking All Seasons when already on all seasons, neither of which should throw.

### Test setup and check

No existing `*.test.js` files were found under `node\frontend\src\`. Use Jest's API mock with the existing React 18 dependencies (`createRoot` and `act` from `react-dom/test-utils`) and DOM button clicks/assertions; no new packages are needed. Clean up roots, mocks, and the fixed clock between tests. Only the implementer changes `node\frontend\src\pages\Episodes.js`; only the test-writer adds its adjacent `Episodes.test.js`. No service, component, styling, or backend changes are planned.

The later check is `npm --prefix node/frontend test -- --watchAll=false --ci`; the responsible worker/orchestrator records the output per the approved task. The planner does not run commands or install dependencies; if dependencies are absent, ask the person to install them.

### Risks

- Removing the cache increases requests on repeated filter clicks and remounts; preserve correctness without changing unrelated API behavior.
- Merely removing or keying the cache leaves out-of-order responses free to overwrite the selected filter; guarding only success still permits stale errors or `finally` to end a newer request's loading state.
- Client-side filtering of the last response could lose other seasons after a filtered load; always request all episodes when returning to all seasons.
- Updating the season list from filtered data would remove navigation options; retain the all-episodes-derived list.
- A nullable All Seasons argument is not equivalent to `season?.id` being `undefined`; handle null explicitly and preserve the existing selected-season toggle.
