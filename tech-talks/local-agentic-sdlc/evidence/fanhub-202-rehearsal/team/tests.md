## Round 2

Added `node/frontend/src/pages/Episodes.test.js` (9 cases), using existing Jest, React 18 `createRoot`/`act`, the real episode list, and a mocked API. No added tooling, sleeps, or test execution.

### Acceptance mapping and regressions

- **A1:** `A1: selecting Season 2 immediately after initial load displays only Season 2 episodes (direct envelope)` and `A1: selecting Season 2 immediately after initial load displays only Season 2 episodes (nested envelope)`. Fixed nonzero `Date.now()` with no elapsed time exposes the original 30-second unkeyed-cache regression. Assert initial `{}`, immediate `{ season_id: 202 }` (not season number 2), loading completion, exactly the Season 2 titles after one click, and retained filter buttons. Both API envelopes are exercised end to end.
- **A2:** `A2: an older success cannot overwrite the newer selected season`. Resolve Season 2 before older Season 1; assert stale success cannot replace current titles or change loaded/error state.
- **A2:** `A2: an older success cannot finish loading while the latest season request is pending`. Resolve older Season 1 while Season 2 remains pending; catch stale success/finally prematurely removing loading or exposing obsolete titles, then verify the latest result.
- **A2:** `A2: an older rejection cannot show an error or finish loading while the latest request is pending`. Reject older Season 1 while Season 2 remains pending; catch stale error/finally changes to current error/loading, then verify the latest result.
- **A2:** `A2: an older rejection cannot change the latest season's loaded data or show an error`. Reject older Season 1 after Season 2 completes; assert current titles, completed loading, and absence of stale error remain unchanged.
- **A3:** `A3: returning to All Seasons displays all episodes`. Select Season 2, then All Seasons; catch the null dereference, incorrect request parameters, missing all-season titles, and lost season buttons. Selecting Season 2 afterward also proves returning to all cleared the selection.
- **A3:** `A3: clicking the selected Season 2 again deselects it and displays all episodes`. Catch a broken selected-season toggle; require `{}` and all titles/buttons after completion.
- **A3:** `A3: clicking All Seasons when already on all seasons safely displays all episodes`. Catch unsafe null handling or incorrect all-season reload behavior.

All acceptance criteria covered; no untestable criterion or implementation blocker identified. Tests were not run; the orchestrator owns the prescribed check and evidence.

## Round 3

- Routed validation: `.team/evidence/check-1.txt` reports all nine A1-A3 cases passing, but `.team/evidence/lint-1.txt` reports four `no-undef` errors for `globalThis` in `Episodes.test.js` setup/cleanup. The check also reports deprecated `ReactDOMTestUtils.act`.
- Replaced those four references with the browser/Jest-supported `window.IS_REACT_ACT_ENVIRONMENT`, preserving setup and restoration of the act environment flag. Imported `act` directly from `react`; installed React 18.3.1 exports it. No dependencies, lint configuration, assertions, or test names changed.
- **A1:** Unchanged tests: `A1: selecting Season 2 immediately after initial load displays only Season 2 episodes (direct envelope)` and `A1: selecting Season 2 immediately after initial load displays only Season 2 episodes (nested envelope)`.
- **A2:** Unchanged tests: `A2: an older success cannot overwrite the newer selected season`; `A2: an older success cannot finish loading while the latest season request is pending`; `A2: an older rejection cannot show an error or finish loading while the latest request is pending`; `A2: an older rejection cannot change the latest season's loaded data or show an error`.
- **A3:** Unchanged tests: `A3: returning to All Seasons displays all episodes`; `A3: clicking the selected Season 2 again deselects it and displays all episodes`; `A3: clicking All Seasons when already on all seasons safely displays all episodes`.
- No new tests or untestable criteria. Tests and lint were not run; the orchestrator owns revalidation and evidence.
