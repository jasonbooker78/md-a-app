# MD Anderson Workflow Tracker — Prototype PRD v2
**Source:** Thomas Sanchez (Assoc. Director, Research) call transcript  
**Status:** Post-demo feedback — next iteration  
**Audience for this PRD:** Dev/design team building the updated prototype

---

## Strategic Context

The call confirmed strong interest and a clear path forward. Thomas identified two audiences who need to see this:

1. **Terry** (study coordinator lead) — operational validation. She knows the day-to-day pain better than anyone. Her buy-in signals credibility to faculty.
2. **Faculty / PIs** — the people who will push Julio (presumably the decision-maker / department head) to fund this. The pitch to them is metrics and reporting — can they see how their studies are performing?

The fork in the road Thomas named is important: **QuickBase replacement hire vs. build something better.** The prototype needs to make the "build something better" path feel obviously superior. The changes below are all in service of that.

---

## Terminology Changes
*These are cosmetic but matter a lot for credibility with the real audience.*

| Current | Replace With | Why |
|---|---|---|
| CTMS | **Workflow Tracker** (or "Department Workflow System") | Thomas was explicit: don't position this as competing with Encore (the institution's CTMS). This is department-level, not institution-level. |
| IRB Admin / David | **Regulatory Analyst** | "IRB" connotes the central office. "Regulatory" means the department-level role. |
| THN-204 | **2025-0004** (or similar format: `YYYY-NNNN`) | Protocol naming convention at MD Anderson is year of IRB submission + 4-digit sequence number. |
| "Monday Morning on Protocol THN-204" | **"Monday Morning on Protocol 2025-0004"** | Follows from above. |
| Epic data integration language | Remove or soften | Thomas confirmed coordinators still manually pull from Epic. Don't imply a live integration that doesn't exist. See note below. |

**On the Epic framing specifically:** Thomas said coordinators go into Epic and "translate that into the sponsor's database." The value isn't pulling data automatically — it's giving them a structured place to record what they observed and note anything out of the ordinary. Reframe the lab values panel accordingly.

---

## Screen-Level Changes

### Landing Page
- Update all terminology per table above
- In the problem cards, replace "data re-entry from Epic" language with something closer to: "no structured place to record and flag visit observations at the department level"
- The three-column layout works well — keep it

### Visit Form (`/visit-form`) — significant rework
**Remove:** "Source: Epic · auto-populated" framing  
**Replace with:** A lab values section that is a **coordinator-facing notes and observation panel**

What Thomas actually described:
- The coordinator goes into Epic, pulls the lab values, enters them here manually (or reviews pre-populated values)
- The real value is a **notes/flag field per lab value** — a place to record "this was out of range and here's what was done about it" or "this needed follow-up with the PI"
- The current read-only display misses the point — it should be an **editable entry form with a notes column**

Suggested new lab values table structure:
| Test | Value | Reference Range | Flag | Notes / Action Taken |
|---|---|---|---|---|
| ANC | [input] | 1.8–7.7 | ⚠ Out of range | [text input] |

The flag should auto-highlight when a value is outside reference range. The notes field is where coordinators document what happened — this becomes the audit trail.

**Keep:** Vital signs panel, concomitant medications checkboxes, SAE logging flow — Thomas confirmed these were accurate.

### Amendment Detail (`/amendment-detail`) — add trigger logic narrative
Thomas called out a specific workflow that the demo hints at but doesn't complete:

> "The really good thing with the amendments is if regulatory can put in information here... it triggers to tell the study coordinator: time to go get an updated signature on the latest consent form."

Add to the amendment acknowledgment flow:
- After the coordinator acknowledges, show a **follow-up task generated**: "Re-consent required for enrolled patients on ICF v1.3 — due [date]"
- This task should surface back in the Work Queue as a new action item
- It makes the amendment → re-consent workflow feel end-to-end, not just a notification

### Compliance Dashboard (`/compliance-dashboard`)
- Rename "IRB Admin" persona to "Regulatory Analyst" throughout
- Update stat card labels to match new terminology

---

## New Features / Additions

### 1. Faculty / PI Reporting View (new screen)
**Priority: High** — Thomas said this is what will get faculty excited and push Julio to fund it.

Thomas described the specific metrics PIs want:
- How many visits did each coordinator complete this period?
- Were visits completed correctly, accurately, and on time?
- Data entry timeliness: was EDC data entered within the SOP-required window (e.g., 3 days for visit data, 5 days for labs)?
- **The delta** — visits that occurred vs. visits that were entered. That gap is the KPI.

Suggested screen: **Protocol Performance Dashboard** (new route, e.g., `/faculty-dashboard`)

Contents:
- Summary cards: Active protocols, Total visits this month, On-time entry rate %, Open SAEs
- **Visit Completion Table** — per coordinator, per protocol: visits scheduled vs. completed vs. entered into EDC, with entry timeliness flag (green = within SOP window, red = late)
- **Entry Timeliness Chart** — simple bar or trend showing the delta Thomas described
- This is a read-only view; no actions required for the demo

This screen is the "show the faculty" moment. It doesn't need to be data-perfect — it needs to make the value proposition legible at a glance.

### 2. SOP Integration (surface in demo, don't fully build)
Thomas mentioned that SOPs exist as documents and that a major goal is standardizing coordinator behavior across all studies. He specifically described wanting SOPs embedded in workflows — not just "step A, B, C" but granular sub-steps.

For the demo, surface this lightly:
- In the Visit Form, add a small **"View SOP"** link next to the adverse event section — clicking opens a modal or sidebar with a simplified SOP checklist for AE documentation
- This signals the capability without requiring full SOP content (which Terry would need to provide)
- Thomas said: "Send us the SOPs and we can weave them in" — this feature is the placeholder for that

### 3. Grant Management Module Placeholder
Thomas was explicit: grants and clinical trials are "two different rooms in the same house." The people are mostly separate. He suggested treating this as a distinct module, not integrated into the clinical trials flow.

For the demo: add a **second nav section** in the sidebar labeled "Grant Management" with a single placeholder screen that says something like "Grant lifecycle tracking — coming soon" or shows a locked/inactive state. This signals the system's scope without building it out. It also positions the platform as a department-wide tool, not just a trials tool.

### 4. Coordinator Work Queue — SOP deadline indicators
Thomas described a specific pain point: SOPs require data entry within N days of a visit, but there's no system enforcing or tracking that. Coordinators miss it. PIs can't see it.

Add to the Work Queue:
- A **"Pending EDC Entry"** section below Today's Visits showing completed visits where data hasn't been entered yet, with a countdown: "3 days remaining to enter" (green → yellow → red as deadline approaches)
- This directly feeds the faculty reporting delta Thomas described

---

## Next Steps Thomas Named

1. **Connect with Terry** (study coordinator lead) — Thomas will intro. Approach: open a screen share, click through the demo, ask her to narrate everything that's wrong, confusing, or missing. Record/transcribe. Use transcript as input for next iteration.

2. **Connect with Tony Glover** (division-level, was the QuickBase point person) — Thomas will intro. She's the institutional continuity on QuickBase. Important to position this as complementing Encore, not competing with it.

3. **Faculty / PI presentation** — Thomas's recommended sequence is Terry first (to add credibility), then faculty. Faculty seeing Terry's fingerprints on it will make them receptive. Then Julio makes the decision.

4. **Naming** — Thomas noted the URL (`md-a-app`) needs a better name. Worth having a name for the product before the faculty meeting. "Workflow Tracker" is the functional descriptor; a proper product name would help.

---

## What to Hold Off On

- **Epic integration** — don't build or imply. The value prop is department-level workflow tracking, which complements Epic and Encore rather than replacing them. Thomas was clear this needs to be framed as filling gaps the institution isn't looking at.
- **Full SOP content** — wait for Terry's input before populating. Placeholder is fine.
- **Grant management detail** — wait to understand who the audience is and what they actually track.

---

## Summary: Priority Order for Next Build Sprint

| Priority | Change | Effort |
|---|---|---|
| 1 | Terminology updates throughout | Low |
| 2 | Lab values panel → editable with notes/flag field | Medium |
| 3 | Amendment → re-consent task trigger in Work Queue | Medium |
| 4 | Faculty/PI reporting dashboard (new screen) | High |
| 5 | Pending EDC entry / SOP deadline indicators in Work Queue | Medium |
| 6 | SOP modal placeholder on Visit Form | Low |
| 7 | Grant Management nav placeholder | Low |
