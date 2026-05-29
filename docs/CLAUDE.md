# MD Anderson Workflow Tracker — Build Log

Project: Department-level research workflow tracking prototype for MD Anderson Oncology
Stack: React 19, Vite, Tailwind v4, React Router v7
Deployed: Vercel (GitHub auto-deploy from `main`)

---

## Build Log

### Session 1 — 2026-05-29

#### What was built / changed

**PRD v2 implementation** — all 7 priorities from Thomas Sanchez post-demo feedback call:

- **Terminology sweep** across all screens:
  - "CTMS" → "Workflow Tracker" / "Department Workflow Tracker"
  - "IRB Admin / David" → "Regulatory Analyst"
  - Protocol IDs switched to MD Anderson YYYY-NNNN format: `THN-204` → `2025-0004`, `GBM-110` → `2024-0110`
  - Removed "Source: Epic · auto-populated" framing from VisitForm lab/vitals/meds panels

- **Lab values panel rework** (`src/screens/VisitForm.jsx`):
  - Replaced read-only display + click-to-edit pattern with always-editable entry form
  - New columns: Test | Value | Reference Range | Flag | Notes / Action Taken
  - Auto-flag logic (`isOutOfRange`) highlights rows and badge when value outside `refMin`/`refMax`
  - ANC preset to 1.5 (below 1.8 threshold) so a live flagged row appears in demo
  - Flagged row count shown in summary banner above table
  - Notes field per row persisted to `DemoStateContext`

- **Amendment → re-consent task trigger** (`src/context/DemoStateContext.jsx`, `src/screens/AmendmentDetail.jsx`, `src/screens/WorkQueue.jsx`):
  - `acknowledgeAmendment()` now also sets `reconsentTask: { generated: true, dueDate: 'May 26, 2026' }`
  - Blue action item appears in Work Queue after acknowledgment
  - "Follow-up task generated" card appears at bottom of Amendment Detail after acknowledgment

- **Faculty/PI reporting dashboard** — new screen (`src/screens/FacultyDashboard.jsx`), route `/faculty-dashboard`:
  - Summary cards: Active Protocols, Visits This Month, On-Time Entry Rate %, Open SAEs (live from state)
  - Visit Completion Table: per coordinator per protocol — Scheduled / Completed / Entered EDC / Timeliness chip
  - Entry Timeliness chart: CSS bar chart (no chart library) showing weekly visits vs. EDC entries; gap is the KPI Thomas named
  - Read-only view

- **Pending EDC Entry section** in Work Queue (`src/screens/WorkQueue.jsx`):
  - Static fixture data: 2 visits with 3-day and 1-day remaining
  - Color-coded deadline: green (3d+), orange (1d), red (overdue)
  - Shows SOP window label ("3 days from visit")

- **SOP modal placeholder** on Visit Form:
  - "View AE SOP" text link next to the "+ Log Adverse Event" button
  - Modal with 7-step AE documentation checklist
  - Footer note acknowledging placeholder status pending Terry's input

- **Grant Management nav + placeholder screen** (`src/screens/GrantManagement.jsx`, route `/grant-management`):
  - Added to all three persona navs with `|` visual separator (via `section: true` property)
  - Placeholder screen with locked/coming-soon state and planned scope bullets
  - Includes Thomas's quote: "two different rooms in the same house"

- **New PI persona** (`src/context/PersonaContext.jsx`):
  - `pi`: Dr. K., Principal Investigator, green avatar (`bg-emerald-700`), home → `/faculty-dashboard`
  - Added as third card on landing page (`src/screens/PersonaSelect.jsx`)
  - Act 3 added to demo walkthrough timeline on landing page

- **Brand typography** (`src/index.css`, `index.html`):
  - Google Fonts loaded: Crimson Text (400/600), Roboto Condensed (700), Archivo (300/400/500/600/700)
  - `--font-heading` → Crimson Text (flows to all `h1`/`h2`/`h3` and `font-heading` class)
  - `--font-sans` → Archivo (body default, replaces Arial)
  - `--font-condensed` → Roboto Condensed
  - `.uppercase { font-family: var(--font-condensed) }` — auto-applies condensed to all uppercase elements (section labels, table headers, tags, nav) without touching individual components

- **Header redesign** (`src/components/PageShell.jsx`, `src/screens/PersonaSelect.jsx`):
  - Background: `bg-mda-red` → `bg-white border-b border-mda-gray-200 shadow-sm`
  - "MD Anderson" text → `<img src="/MDAnderson_logo.png" h-9>` (logo file in `public/`)
  - Nav links: Roboto Condensed Bold, uppercase, `tracking-widest`; active state = MDA red pill; inactive = gray with hover
  - All red-on-dark colors updated to gray-on-white equivalents
  - Applied consistently to both PageShell header and PersonaSelect standalone header

- **Bug fixes**:
  - `ScrollToTop` component in `src/App.jsx` — `window.scrollTo(0,0)` on every route change via `useLocation`
  - `SAELogging.jsx` "View Compliance Dashboard" button now calls `setPersonaId('irb')` before navigating — fixes Maria showing in header on David's screen
  - `favicon.ico` added to `public/`, `index.html` updated from SVG reference
  - `vercel.json` added with SPA catch-all rewrite — fixes 404 on direct URL / browser refresh for all non-root routes

#### Key decisions made

- **No chart library added** — FacultyDashboard uses CSS bar widths (percentage of max) for the timeliness chart. Keeps the bundle lean for a prototype; Recharts or similar can be added if the PI dashboard becomes a real feature.
- **`.uppercase` CSS rule** rather than per-component `font-condensed` class additions — cleaner single-point change that catches all existing uppercase elements automatically. Weight intentionally not set in the rule so Tailwind weight utilities (`font-bold`, `font-semibold`) remain authoritative per element.
- **`section: true` nav property** — used to drive the Grant Management visual divider in PageShell rather than hardcoding it, keeping nav config declarative in PersonaContext.
- **Vercel SPA fix is now in global `~/.claude/CLAUDE.md`** — will be applied automatically to all future React Router + Vercel projects without needing to be asked.
- **Thomas's positioning framing adopted throughout** — "department-level, complements Encore/Epic" is the explicit frame in landing page copy and Grant Management placeholder. "Competing with Encore" is the failure mode to avoid.

#### Known limitations / deferred work

- **SOP content is a placeholder** — the 7-step AE checklist is illustrative. Real content requires Terry's input. The modal footer flags this explicitly.
- **Grant Management is locked** — scope and audience TBD after connecting with the grants team. No data model designed yet.
- **Faculty dashboard is static fixture data** — `coordinatorRows` and `timelinessData` in `FacultyDashboard.jsx` are hardcoded. Not wired to any live state from the demo flow.
- **Product naming** — Thomas flagged the URL (`md-a-app`) needs a proper product name before the faculty meeting. No name decided yet.
- **Next demo steps** (per Thomas): connect with Terry for hands-on walkthrough → faculty presentation → Julio decision.
