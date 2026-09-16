# PRD documents — status

> **⚠ Attachment gap (disclosed):** the bundle
> `nexora-platform-prd-phase0.zip` referenced by the Phase 0 task was **not
> present in the automation sandbox** (checked the repository, `/tmp`,
> `/mnt`, and the full filesystem) and no branch on the remote contains
> `apps/growth-partner-next`.
>
> The Phase 0 implementation therefore follows the **canonical rules restated
> verbatim in the Phase 0 task brief** (reward names, commission rules,
> canonical table list, environment lock). Those restated rules are encoded in
> `src/lib/constants/*`, `src/db/schema.ts` and enforced by the contract
> tests, so the code cannot silently drift from them.
>
> **Action required:** drop the original files from
> `nexora-platform-prd-phase0.zip` into this directory (`01_PRD.md` …
> `10_memory.md`), replacing the provisional files below, and reconcile any
> wording differences during **Phase 7/8** (already tracked as a known
> deferred item in the Phase 0 PR).

## Expected file set

| File            | Status                                                              |
| --------------- | ------------------------------------------------------------------- |
| `01_PRD.md`     | 🟡 provisional — canonical rules consolidated from the task brief    |
| `02_*` – `07_*` | 🔴 missing — upload from the PRD bundle                              |
| `08_TRACKER.md` | 🟢 created — Phase 0 rows updated (0.1 PASS, 0.2 PASS)               |
| `09_*`          | 🔴 missing — upload from the PRD bundle                              |
| `10_memory.md`  | 🟡 provisional — Phase 0 decision log                                |
