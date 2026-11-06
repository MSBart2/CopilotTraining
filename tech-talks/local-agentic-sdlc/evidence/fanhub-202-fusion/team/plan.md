## Round 1

### Cause
The cache-hit branch in `node/frontend/src/pages/Episodes.js` (`if (episodeCache && cacheTimestamp && now - cacheTimestamp < 30000)`) returns the shared `episodeCache` without checking `seasonId`, so a recent all-season response is shown after selecting a season.

### Tasks
- **A1** — **File:** `node/frontend/src/pages/Episodes.js`. **Change:** Key cached episode data by requested season (including the all-seasons request) and only reuse a matching entry. **Test:** Add `node/frontend/src/pages/Episodes.test.js` coverage that loads the page, selects Season 2 within the cache window, and verifies only Season 2 episodes are displayed.
- **A2** — **File:** `node/frontend/src/pages/Episodes.js`. **Change:** Ensure a response for an earlier season selection cannot overwrite the episodes for the current selection, for example by tracking the latest request. **Test:** Add coverage in `node/frontend/src/pages/Episodes.test.js` that changes seasons and resolves the earlier request last, then verifies the current selection's episodes remain displayed.

### Risks
A quick cache bypass or incomplete cache key could regress all-seasons behavior or cause unnecessary API requests; fixing only the cache lookup could still let slower, outdated requests overwrite the latest selection.
