# Build Plan — Oncology CTMS Prototype

**Stack:** React + Vite + Tailwind CSS  
**Goal:** 6-screen clickable prototype for a ~7-min demo  
**Branch:** `feature/initial-build`

---

## Phase 1 — Project Scaffold
- [x] Initialize Vite + React app
- [x] Configure Tailwind CSS
- [x] Set up MD Anderson design tokens (red primary, purple accent, Univers/Minion font stack)
- [x] Create routing structure (React Router) for 6 screens
- [x] Build shared layout components: top nav, page shell

---

## Phase 2 — Shared Components
- [x] `Banner` — amendment notification (high-priority visual treatment)
- [x] `SourceLabel` — "Imported from Epic · [timestamp]" badge
- [x] `StatusBadge` — Acknowledged ✓ / Pending / SAE Urgent
- [x] `Card` — content card with colored top border
- [x] `Button` — primary (red), secondary (outline)
- [x] `Timeline` entry component

---

## Phase 3 — CRC Screens (Maria, Act 1)

| Screen | Key interactions | Done |
|--------|-----------------|------|
| 1 — Work Queue | Amendment banner → links to Screen 2; visit task list | [ ] |
| 2 — Amendment Detail | Acknowledge button → toggles to timestamped confirmed state | [ ] |
| 3 — Visit Form | Pre-populated lab/vital/med values with Epic source labels; "Log AE" button → Screen 4 | [ ] |
| 4 — SAE Logging | Grade selector triggers SAE flag; auto-calculated deadline (`May 26, 2026`); submit → confirmation state | [ ] |

---

## Phase 4 — IRB Admin Screens (David, Act 2)

| Screen | Key interactions | Done |
|--------|-----------------|------|
| 5 — Compliance Dashboard | Acknowledgment tracker (Maria ✓, 1 pending + "Reminder queued"); SAE alert card → Screen 6 | [ ] |
| 6 — Regulatory Timeline | Chronological event list; today's SAE highlighted; non-functional "Download Regulatory Binder" button | [ ] |

---

## Phase 5 — Polish
- [ ] Verify visual hierarchy (SAE = red/urgent, amendment = orange/monitoring)
- [ ] Accessibility contrast check (WCAG AA minimum)
- [ ] Demo flow link-through: every CTA navigates correctly for the scripted walkthrough
- [ ] Responsive check at 1280px+ (demo likely on a laptop)

---

*MD Anderson Cancer Center · Oncology CTMS Prototype · May 2026*
