## Round 1

Issue: #202 - Season filter shows the wrong episodes right after the page loads
Status: approved

### Goal

Fix the Node frontend Episodes page so selecting a season immediately after initial load reliably displays that season's episodes without waiting and selecting it again.

### Acceptance

- A1: After the initial all-episodes list loads, selecting Season 2 within a few seconds displays only Season 2 episodes when loading finishes, without requiring another selection.
- A2: An older episode request completing after a newer season selection cannot replace the episodes for the currently selected filter.
- A3: Returning from a season filter to the all-seasons option displays all episodes as before.

### Check

Add focused tests next to the affected source under `node/frontend/src/`, named after their acceptance criteria (`A1: ...`, `A2: ...`, `A3: ...`).

Run `npm --prefix node/frontend test -- --watchAll=false --ci` and save its output to `.team/evidence/check-N.txt`.

Do not install packages, commit, push, or merge. If dependencies are missing, ask the person to install them before proceeding.

### Approval

The person must review or edit this task and set `Status: approved` before planning or implementation begins.
