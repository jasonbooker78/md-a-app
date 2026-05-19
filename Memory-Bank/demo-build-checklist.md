# Demo Build Checklist — Oncology CTMS Prototype

**Scenario:** Monday Morning on Protocol THN-204  
**Personas:** CRC (Maria) · IRB Admin (David)  
**Target:** 6 screens · ~7 min demo

---

## 📋 CRC — Maria (4 screens)

### Screen 1 — Work Queue (CRC Home)
*Act 1, Scene 1 · Maria opens the system*

- [ ] Dated visit task list — patient name, protocol ID, visit name (e.g. "Cycle 2 Day 1"), time
- [ ] Amendment notification banner — "Protocol THN-204 amended. Acknowledgment required." with a clear CTA
- [ ] Query count indicator — "2 queries due this week" with days-remaining context
- [ ] Visual priority treatment — amendment notification distinct from routine tasks

**Wow moment:** The work queue is Maria's front door. Everything she needs today is in one place — no inbox, no spreadsheet, no tab-switching.

---

### Screen 2 — Amendment Detail + Acknowledge
*Act 1, Scene 2 · Maria reviews and acknowledges the amendment*

- [ ] Protocol name, amendment number, and approval date
- [ ] Plain-language summary of what changed (one to two sentences about the ICF update)
- [ ] ICF version before and after (e.g. "v1.2 → v1.3")
- [ ] Prominent "Acknowledge" button — primary action on the page
- [ ] Post-acknowledge confirmation state — timestamp displayed, button replaced with "Acknowledged ✓"

**Wow moment:** Acknowledgment is one click, timestamped, and immediately visible to the IRB Admin on their dashboard.

> **Today:** IRB Admin emails a distribution list. CRC may not read it. No record of who acknowledged — discovered at monitoring.

---

### Screen 3 — Visit Form (Pre-populated from Epic)
*Act 1, Scene 3 · Maria opens the Cycle 2 Day 1 visit for Patient R.C.*

- [ ] Visit header — patient identifier (initials + subject ID), protocol, cycle/day, visit window dates
- [ ] Lab values section — ANC, creatinine, LFTs pre-filled with values and an "Imported from Epic · [timestamp]" source label
- [ ] Vital signs section — pre-filled, same source label treatment
- [ ] Confirm/edit affordance — values are readable but editable if the CRC needs to correct
- [ ] Concomitant medications section — pre-populated list from Epic with confirm checkbox
- [ ] "Log Adverse Event" secondary action visible on the form (used in Screen 4)

**Wow moment:** Maria confirmed the visit without opening Epic. The afternoon re-entry block is gone — she reviews, not transcribes.

> **Today:** CRC opens Epic, copies labs into a paper source document, then re-keys them into the EDC system — typically in a dedicated afternoon block.

---

### Screen 4 — SAE Logging Form + Auto-Calculated Deadline
*Act 1, Scene 4 · Patient reports new symptom; Maria logs a grade 3 adverse event*

- [ ] Event date field — drives deadline calculation
- [ ] Grade selector (1–5) — selecting Grade 3+ triggers SAE classification logic
- [ ] Relatedness assessment — dropdown (Unrelated / Possibly / Probably / Definitely)
- [ ] SAE classification indicator — system auto-flags as SAE when criteria met, with a brief explanation
- [ ] Auto-calculated FDA deadline — "7-day expedited report due: May 26, 2026" displayed prominently on submit
- [ ] Submit confirmation state — SAE logged, deadline visible, note that IRB Admin has been notified

**Wow moment:** Maria didn't look up the reporting window. She didn't call the IRB office. The obligation surfaced itself.

> **Today:** CRC calls or emails IRB Admin to report the SAE. Reporting deadline tracked manually on a calendar. Missed windows are a compliance risk.

---

## ⚖️ IRB Admin — David (2 screens)

### Screen 5 — Compliance Dashboard (IRB Admin Home)
*Act 2, Scene 5 · David opens his dashboard after the amendment and SAE*

- [ ] Amendment acknowledgment tracker for THN-204 — list of assigned CRCs with acknowledged / pending status and timestamp for those who have confirmed
- [ ] One CRC shown as pending — with "Reminder queued" label to show the system is following up automatically
- [ ] SAE alert card — "New SAE · THN-204 · logged 14 min ago by Maria R. · FDA deadline May 26" with a link to details
- [ ] Clear visual hierarchy — SAE alert reads as urgent; acknowledgment tracker reads as monitoring

**Wow moment:** David knows about the SAE and the acknowledgment gap without a single email or phone call. He is monitoring, not chasing.

> **Today:** David waits for the CRC to call about the SAE. Amendment compliance checked by manually following up with individuals. No audit trail of who was notified.

---

### Screen 6 — Protocol Regulatory Timeline (THN-204)
*Act 2, Scene 6 · David clicks into the full regulatory history*

- [ ] Chronological event timeline — vertical list, most recent at top
- [ ] Event types: protocol activation, amendment approvals, ICF version changes, patient consent logs (anonymized), today's SAE
- [ ] Each event shows: event type, date, actor (CRC name or "System"), one-line description
- [ ] Today's SAE entry highlighted as the most recent event
- [ ] "Download Regulatory Binder" button — non-functional in prototype, but visible

**Wow moment:** If an FDA inspector walked in right now, David pulls this screen. The complete regulatory record assembled itself — no binder required.

> **Today:** David manually assembles a binder from PDFs across multiple systems, email archives, and shared drives. Takes hours before an inspection or monitoring visit.

---

## Summary

| # | Screen | Persona | Priority | Done |
|---|--------|---------|----------|------|
| 1 | Work Queue | CRC | Must have | [ ] |
| 2 | Amendment Acknowledge | CRC | Must have | [ ] |
| 3 | Visit Form (pre-populated) | CRC | Must have | [ ] |
| 4 | SAE Logging + Deadline | CRC | Must have | [ ] |
| 5 | Compliance Dashboard | IRB Admin | Must have | [ ] |
| 6 | Regulatory Timeline | IRB Admin | Nice to have | [ ] |

---

*MD Anderson Cancer Center · Oncology CTMS Prototype · May 2026*
