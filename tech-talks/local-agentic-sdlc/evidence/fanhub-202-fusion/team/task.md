# Issue 202

## Goal

Ensure the Episodes page applies the selected season filter correctly immediately after the episode list has loaded.

## Acceptance

- A1: Selecting Season 2 shortly after the Episodes page finishes loading immediately shows only Season 2 episodes.
- A2: Changing the season selection continues to show episodes matching the current selection, without stale results from the previous selection.

## Check

- `npm --prefix node/frontend test -- --watchAll=false --ci`
- `node/frontend/node_modules/.bin/eslint` on every changed file under `node/frontend/src/`

Status: approved
