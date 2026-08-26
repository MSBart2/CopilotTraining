# tech-talks / discoveries

## Named-talk refresh burned a session on empty-ledger + full council + wipe (2026-08-25)

`schema_talk-refresh` | `date: 2026-08-25`

Refreshing `copilot-cli` after "apply" ran the greenfield pipeline: 7-day feed (missed the Aug 10 cutoff), empty ledger treated as a near-stop, 3-phase Agent Council to confirm a recipe already intended to keep, then wipe-and-regen plus retries on `fetch_webpage` / slide-generator network errors.

What actually needed to happen: `--since <README updated>`, first-party CLI command reference + GitHub releases, README patch, existing-deck patch for `/rewind` and sandbox wording, one single-deck build.

Contract now lives in `content-refresh` cheap-path table, `ledger-tech-talk-refresh` named-talk continuation, compact council default, and slide-generator `patch` mode.
