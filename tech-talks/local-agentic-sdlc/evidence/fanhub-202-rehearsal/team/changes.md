## Round 2

- **A1:** In `node/frontend/src/pages/Episodes.js`, removed the module-level episode cache, its 30-second early return, and cache writes. Each load now requests the selected season or all episodes through the existing API parameters. Preserved `response.data.data || response.data`, rendering, and season derivation from all-episodes responses so immediate selections cannot replay cached all-season data.
- **A2:** Added an instance-local `useRef` request counter, incremented for every load. Only the current request can update episodes, seasons, errors, or completion loading state; initial-load effect cleanup invalidates outstanding requests. This prevents older successes, failures, and finalizers from superseding a newer selection or committing after unmount.
- **A3:** Explicitly handle `season === null` before accessing `season.id`, while retaining the selected-season deselection toggle. Both paths request all episodes, and filtered responses leave the all-episodes-derived season buttons intact.
- **Risks:** Removing caching increases requests on repeated selections/remounts. Superseded requests are ignored rather than canceled and still consume network resources. Existing API envelopes, season extraction, and rendering behavior remain unchanged.
- No tests run or edited; no packages installed. No implementation blocker identified.
