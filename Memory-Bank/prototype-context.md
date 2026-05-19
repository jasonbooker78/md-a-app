# Oncology CTMS Prototype — Copilot Context

> **Load this file into your repo as `.github/copilot-instructions.md`** (or reference it in your project README) to give Copilot full context on what is being built and why.

---

## What This Is

A clickable prototype for **MD Anderson Cancer Center's Oncology department** demonstrating a next-generation Clinical Trial Management System (CTMS). The prototype is used to present a strategic direction to departmental leadership, replacing the current QuickBase system after the loss of the sole SME.

**Demo format:** ~7-minute scripted walkthrough called **"Monday Morning on Protocol THN-204"**  
**Build target:** 6 screens across 2 personas  
**Recommended stack:** React + Vite + Tailwind CSS

---

## The Problem Being Solved

The oncology department manages **100+ active clinical trials** and ~110 staff across regulatory, finance, and study coordinator teams. Their current QuickBase system has failed because:

1. **Bus factor = 1** — The sole QuickBase SME left, and no one remaining can maintain or develop it.
2. **Shadow spreadsheets** — Coordinators maintain private Excel trackers because the UI is too cumbersome, creating duplicate data and reporting inconsistencies.
3. **Manual re-entry** — Data already in Epic (EHR) and Encore (institutional CTMS) is re-keyed into QuickBase by hand — wasting time and introducing errors.
4. **No audit trail** — Amendment acknowledgments are tracked via email. SAE reporting deadlines are managed on personal calendars. No defensible compliance record exists.

The prototype must demonstrate that a better system **provably reduces coordinator work** — not just consolidates it.

---

## Strategic Context

Three options are on the table for department leadership:

| Option | Description |
|--------|-------------|
| **Backfill** | Hire a new QuickBase SME and continue on the current platform |
| **Build** | Develop a low-code or custom alternative that is less SME-dependent |
| **Align** | Adopt an institutional or commercial CTMS (e.g., OnCore, Veeva) |

This prototype supports the **Build** option — or serves as a proof-of-concept for the overlay layer in a dual-stack **Align** approach (institutional CTMS for billing/compliance + lightweight departmental layer for daily workflows).

---

## Design Principles

These must be reflected in every screen:

- **Zero Duplicate Entry** — Any data that exists in Epic or Encore must appear pre-populated, with a visible source label (e.g., "Imported from Epic · [timestamp]"). The user reviews, not transcribes.
- **Role-Based UI** — Each persona sees only what is relevant to their job. CRCs see visit tasks and protocol actions. IRB Admins see compliance status. Leadership sees aggregate dashboards.
- **Bus Factor ≥ 2** — No tribal knowledge required to use the system. SOPs are embedded in the UI.
- **Spreadsheet-first for CRCs** — The CRC's work queue should feel like an organised task list, not a database form. The IRB Admin's view should feel like a control panel, not a report.
- **ALCOA++ Integrity** — All actions are timestamped and attributed to a named user. No edits without a record.

---

## Personas

### 📋 Maria — Clinical Research Coordinator (CRC)
- **Job:** Screen/enroll patients, schedule visits, track specimens, enter eCRFs
- **Pain:** Retreats to personal Excel trackers because the current UI is overloaded; spends afternoons re-keying lab values from Epic
- **JTBD:** Manage trial execution without re-keying data or manually calculating visit windows
- **Adoption trigger:** The system must provably reduce her work — she will not adopt a system that just moves the spreadsheet into a web UI

### ⚖️ David — IRB Administrator (Regulatory Officer)
- **Job:** Audit protocols, track amendments, verify consent, manage FDA compliance and SAE reporting
- **Pain:** Amendment notifications go out by email distribution list; no record of who acknowledged; SAE deadlines tracked on personal calendars
- **JTBD:** Reconstruct a complete, defensible regulatory history without manually assembling paper trails
- **Adoption trigger:** The system removes his liability for email-based notification failures and missed reporting windows

---

## Demo Scenario: "Monday Morning on Protocol THN-204"

**Protocol THN-204** is an active oncology trial. This morning:
1. An amendment was approved — the ICF changed from v1.2 → v1.3
2. Patient R.C. has a Cycle 2 Day 1 visit scheduled today
3. Patient R.C. reports a new symptom that grades as a Grade 3 adverse event (SAE)

The demo follows Maria (CRC) through her morning, then cuts to David (IRB Admin) seeing the downstream effect.

---

## Screens to Build

### Act 1 — CRC: Maria

---

#### Screen 1 — Work Queue (CRC Home)
**Scene:** Maria opens the system at the start of her day.

**Purpose:** Show that everything she needs today is in one place — no inbox, no spreadsheet, no tab-switching.

**Components:**
- Dated visit task list: patient name, protocol ID, visit name (e.g. "Cycle 2 Day 1"), time
- **Amendment notification banner** — "Protocol THN-204 amended. Acknowledgment required." with a prominent CTA button
- Query count indicator — "2 queries due this week" with days-remaining context
- Visual priority hierarchy — the amendment banner must visually outrank routine visit tasks

**"Wow moment":** The work queue is Maria's front door. She knows exactly what needs attention before she opens a single other system.

**Today (contrast):** Maria checks her email, personal calendar, a shared drive, and her Excel tracker before she knows what her day looks like.

---

#### Screen 2 — Amendment Detail + Acknowledge
**Scene:** Maria clicks the amendment banner and reviews the change.

**Purpose:** Show that acknowledgment is one click, timestamped, and immediately visible to the IRB Admin.

**Components:**
- Protocol name (`THN-204`), amendment number, and IRB approval date
- Plain-language summary of what changed (one to two sentences about the ICF update)
- ICF version before → after: `v1.2 → v1.3`
- Prominent **"Acknowledge"** button as the primary page action
- **Post-acknowledge state** (interactive): button replaced by "Acknowledged ✓ · [timestamp]"

**"Wow moment":** One click. Timestamped. Immediately feeds David's dashboard (Screen 5).

**Today (contrast):** IRB Admin emails a distribution list. CRC may not read it. No record of who acknowledged — discovered at monitoring visit.

---

#### Screen 3 — Visit Form (Pre-populated from Epic)
**Scene:** Maria opens the Cycle 2 Day 1 visit record for patient R.C.

**Purpose:** Show that Maria reviews, not transcribes. The afternoon re-entry block is gone.

**Components:**
- Visit header: patient identifier (initials `R.C.` + subject ID), protocol `THN-204`, cycle/day, visit window dates
- **Lab values section** — ANC, creatinine, LFTs pre-filled with values and a source label: `"Imported from Epic · [timestamp]"`
- **Vital signs section** — pre-filled, same source label treatment
- Confirm/edit affordance — values are readable but editable if the CRC needs to correct
- **Concomitant medications** — pre-populated list from Epic with a confirm checkbox per item
- Visible **"Log Adverse Event"** secondary action (used in Screen 4)

**"Wow moment":** Maria confirmed the visit without opening Epic once.

**Today (contrast):** CRC opens Epic, copies labs onto a paper source document, then re-keys them into the EDC system — typically in a dedicated afternoon block that takes 1–2 hours.

---

#### Screen 4 — SAE Logging Form + Auto-Calculated Deadline
**Scene:** Patient R.C. reports a new symptom. Maria logs an adverse event from the visit form.

**Purpose:** Show that the system surfaces regulatory obligations automatically — Maria didn't look up the reporting window or call the IRB office.

**Components:**
- Event date field (drives deadline calculation)
- Grade selector (1–5) — selecting Grade 3+ triggers SAE classification logic
- Relatedness assessment dropdown: `Unrelated / Possibly / Probably / Definitely`
- **SAE classification indicator** — system auto-flags as SAE when criteria met, with a brief explanation
- **Auto-calculated FDA deadline** displayed prominently: `"7-day expedited report due: May 26, 2026"`
- Submit confirmation state: SAE logged, deadline shown, system note that IRB Admin has been notified

**"Wow moment":** The obligation surfaced itself. Maria didn't need to know the reporting rules.

**Today (contrast):** CRC calls or emails IRB Admin to report the SAE. Deadline tracked manually on a calendar. Missed reporting windows are a routine compliance risk.

---

### Act 2 — IRB Admin: David

---

#### Screen 5 — Compliance Dashboard (IRB Admin Home)
**Scene:** David opens his dashboard after Maria's morning actions.

**Purpose:** Show that David is monitoring, not chasing. He learned about the SAE and the acknowledgment gap without a single call or email.

**Components:**
- **Amendment acknowledgment tracker for THN-204** — list of assigned CRCs with `Acknowledged ✓ [timestamp]` or `Pending` status
- One CRC shown as pending — labeled `"Reminder queued"` to show automated follow-up
- **SAE alert card** — `"New SAE · THN-204 · logged 14 min ago by Maria R. · FDA deadline May 26"` with a link to details
- Visual hierarchy: SAE alert reads as urgent (red accent); acknowledgment tracker reads as monitoring (orange accent)

**"Wow moment":** David sees the full picture of his morning without a single notification from a colleague.

**Today (contrast):** David waits for the CRC to call about the SAE. Amendment compliance checked by manually following up with individuals. No audit trail of who was notified.

---

#### Screen 6 — Protocol Regulatory Timeline (THN-204)
**Scene:** David clicks into the full regulatory history for THN-204.

**Purpose:** Close the demo — if an FDA inspector walked in right now, David pulls this screen.

**Components:**
- Chronological event timeline — vertical list, most recent at top
- Event types: protocol activation, amendment approvals, ICF version changes, patient consent logs (anonymized), today's SAE
- Each event shows: event type, date, actor (CRC name or `"System"`), one-line description
- Today's SAE entry highlighted as the most recent event
- **"Download Regulatory Binder"** export button — non-functional in prototype, but visible

**"Wow moment":** The complete regulatory record assembled itself. No binder required.

**Today (contrast):** David manually assembles a binder from PDFs across multiple systems, email archives, and shared drives. Takes hours before an inspection or monitoring visit.

---

## Build Priority

| # | Screen | Persona | Priority |
|---|--------|---------|----------|
| 1 | Work Queue | CRC | Must have |
| 2 | Amendment Acknowledge | CRC | Must have |
| 3 | Visit Form (pre-populated) | CRC | Must have |
| 4 | SAE Logging + Deadline | CRC | Must have |
| 5 | Compliance Dashboard | IRB Admin | Must have |
| 6 | Regulatory Timeline | IRB Admin | Nice to have |

---

## Mock Data

Use this consistent mock data across all screens:

| Field | Value |
|-------|-------|
| Protocol | THN-204 |
| Patient identifier | R.C. · Subject ID 1042 |
| Visit | Cycle 2 Day 1 |
| Visit date | May 19, 2026 |
| Visit window | May 17–21, 2026 |
| Amendment number | Amendment 3 |
| ICF version change | v1.2 → v1.3 |
| Amendment approval date | May 16, 2026 |
| SAE event date | May 19, 2026 |
| SAE FDA deadline | May 26, 2026 |
| CRC name | Maria R. |
| IRB Admin name | David K. |
| Epic import timestamp | May 19, 2026 · 07:42 AM |
| Lab: ANC | 2.1 × 10⁹/L |
| Lab: Creatinine | 0.9 mg/dL |
| Lab: ALT | 28 U/L |

---

## Data Model Reference

Use this for component prop shapes and TypeScript types:

```
Patient       patient_id, MRN, demographics, diagnosis, labs[], molecularResults[]
Study         protocol_id, NCT_ID, title, sponsor, phase, eligibility, status
TrialArm      arm_id, protocol_id, label, enrollmentTarget
BiomarkerCrit criteria_id, arm_id, geneSymbol, alterationType, mutation, threshold
Enrollment    enrollment_id, patient_id, protocol_id, arm_id, status, dates
Coordinator   coordinator_id, name, role, assignments[]
```

---

## Integration Context (for source labels)

| Source | What it provides | Mock label |
|--------|-----------------|------------|
| Epic (OneConnect) | Labs, vitals, diagnoses, concomitant meds | `"Imported from Epic"` |
| CORe / Encore | Protocol status, accruals, coordinator assignments | `"Synced from CORe"` |
| OCTANE (PODS) | Genomic & biomarker data | `"Imported from OCTANE"` |
| ClinicalTrials.gov | NCT IDs, eligibility criteria, study status | `"From ClinicalTrials.gov"` |

In the prototype, these are static mock values. The source label pattern (`"Imported from [System] · [timestamp]"`) must be visible on any pre-populated field to communicate the zero-re-entry value proposition.

---

## What Not to Build (Out of Scope for This Prototype)

- Finance / invoice tracking screens
- Leadership accrual forecasting dashboard
- Genomic trial matching / patient eligibility engine
- Full authentication / RBAC system
- Any live API integrations
- Mobile-responsive layout (desktop demo only)

---

## Key Phrases for Demo Narration

These are the core value statements. Build the UI so these land naturally:

- *"Maria confirmed the visit without opening Epic."*
- *"One click. Timestamped. David sees it without being called."*
- *"The obligation surfaced itself — she didn't need to know the reporting rules."*
- *"If an FDA inspector walked in right now, David pulls this screen. The complete regulatory record assembled itself."*

---

*Source: MD Anderson Cancer Center · Oncology CTMS Context artifacts · May 19, 2026*
