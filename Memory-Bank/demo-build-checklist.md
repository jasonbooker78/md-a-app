# Demo Build Checklist — Oncology CTMS Prototype

## 🎤 Demo Introduction (Person A)



**Person A:**
Welcome, everyone! Today, we invite you to imagine a better way to run clinical trials. Our Clinical Trials Management System (CTMS) prototype is designed to solve the real pain points that research teams face every day—making trials more efficient, compliant, and patient-centered.

**What is a CTMS?**
A CTMS is the digital backbone for clinical research operations. It brings together scheduling, data capture, regulatory tracking, and compliance into a single, intuitive platform—replacing spreadsheets, emails, and manual trackers.

**Who are our heroes?**
- **Maria, the Clinical Research Coordinator (CRC):** She’s the frontline of patient care and data integrity, juggling visits, forms, and compliance.
- **David, the IRB Administrator:** He ensures every protocol change and safety event is tracked, reported, and audit-ready.

**Today’s scenario:**
It’s Monday morning on Protocol THN-204, an oncology trial. We’ll follow Maria and David as they navigate a typical—but critical—day, and see how the CTMS transforms their experience.

As we move through the demo, notice how each screen tells a piece of their story—solving real problems and creating new value for every stakeholder.

**Presenters:**
- Person A — Introduction
- Person B — CRC (Maria, Screens 1-2)
- Person C — CRC (Maria, Screens 3-4)
- Person D — IRB Admin (David, Screens 5-6)

---

**Scenario:** Monday Morning on Protocol THN-204  
**Personas:** CRC (Maria) · IRB Admin (David)  
**Target:** 6 screens · ~7 min demo

---

---

## 📋 Maria’s Story — The CRC (Screens 1-2: Person B, Screens 3-4: Person C)

### Screen 1 — Work Queue (CRC Home)

**Person B as Maria:**
*Act 1, Scene 1 · Maria opens the system*
Maria starts her day with clarity. The CTMS work queue is her single source of truth—no more hunting for emails or sticky notes. She sees exactly what’s urgent, what’s new, and what’s next.

- [ ] Dated visit task list — patient name, protocol ID, visit name (e.g. "Cycle 2 Day 1"), time
- [ ] Amendment notification banner — "Protocol THN-204 amended. Acknowledgment required." with a clear CTA
- [ ] Query count indicator — "2 queries due this week" with days-remaining context
- [ ] Visual priority treatment — amendment notification distinct from routine tasks

**Wow moment:** The work queue is Maria's front door. Everything she needs today is in one place — no inbox, no spreadsheet, no tab-switching.

---

### Screen 2 — Amendment Detail + Acknowledge

**Person B as Maria:**
*Act 1, Scene 2 · Maria reviews and acknowledges the amendment*
With a single click, Maria acknowledges a protocol amendment. The system records her action instantly—no more compliance gaps or manual follow-up. The CTMS closes the loop between research and regulatory teams.

- [ ] Protocol name, amendment number, and approval date
- [ ] Plain-language summary of what changed (one to two sentences about the ICF update)
- [ ] ICF version before and after (e.g. "v1.2 → v1.3")
- [ ] Prominent "Acknowledge" button — primary action on the page
- [ ] Post-acknowledge confirmation state — timestamp displayed, button replaced with "Acknowledged ✓"

**Wow moment:** Acknowledgment is one click, timestamped, and immediately visible to the IRB Admin on their dashboard.

> **Today:** IRB Admin emails a distribution list. CRC may not read it. No record of who acknowledged — discovered at monitoring.

---

### Screen 3 — Visit Form (Pre-populated from Epic)

**Person C as Maria:**
*Act 1, Scene 3 · Maria opens the Cycle 2 Day 1 visit for Patient R.C.*
Maria prepares for a patient visit. All labs and vitals are pre-filled from Epic—she reviews, confirms, and moves forward. The CTMS eliminates double data entry and lets her focus on the patient.

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

**Person C as Maria:**
*Act 1, Scene 4 · Patient reports new symptom; Maria logs a grade 3 adverse event*
When a patient reports a new symptom, Maria logs a serious adverse event. The CTMS calculates the reporting deadline and notifies the right people—compliance is built in, not bolted on. Maria can trust that nothing will fall through the cracks.

- [ ] Event date field — drives deadline calculation
- [ ] Grade selector (1–5) — selecting Grade 3+ triggers SAE classification logic
- [ ] Relatedness assessment — dropdown (Unrelated / Possibly / Probably / Definitely)
- [ ] SAE classification indicator — system auto-flags as SAE when criteria met, with a brief explanation
- [ ] Auto-calculated FDA deadline — "7-day expedited report due: May 26, 2026" displayed prominently on submit
- [ ] Submit confirmation state — SAE logged, deadline visible, note that IRB Admin has been notified

**Wow moment:** Maria didn't look up the reporting window. She didn't call the IRB office. The obligation surfaced itself.

> **Today:** CRC calls or emails IRB Admin to report the SAE. Reporting deadline tracked manually on a calendar. Missed windows are a compliance risk.

---

---


**Person D:**
Now, let’s see how the CTMS empowers David, the IRB Admin, to stay on top of compliance and safety—without chasing down information or assembling binders.

---

## ⚖️ David’s Story — The IRB Admin (Person D, 2 screens)

### Screen 5 — Compliance Dashboard (IRB Admin Home)

**Person D as David:**
*Act 2, Scene 5 · David opens his dashboard after the amendment and SAE*
David’s dashboard gives him instant visibility. He knows which CRCs have acknowledged the amendment and sees urgent safety events at a glance. The CTMS does the tracking—David does the oversight.

- [ ] Amendment acknowledgment tracker for THN-204 — list of assigned CRCs with acknowledged / pending status and timestamp for those who have confirmed
- [ ] One CRC shown as pending — with "Reminder queued" label to show the system is following up automatically
- [ ] SAE alert card — "New SAE · THN-204 · logged 14 min ago by Maria R. · FDA deadline May 26" with a link to details
- [ ] Clear visual hierarchy — SAE alert reads as urgent; acknowledgment tracker reads as monitoring

**Wow moment:** David knows about the SAE and the acknowledgment gap without a single email or phone call. He is monitoring, not chasing.

> **Today:** David waits for the CRC to call about the SAE. Amendment compliance checked by manually following up with individuals. No audit trail of who was notified.

---

### Screen 6 — Protocol Regulatory Timeline (THN-204)

**Person D as David:**
*Act 2, Scene 6 · David clicks into the full regulatory history*
With a click, David reviews the full regulatory timeline for Protocol THN-204. Every amendment, consent, and safety event is logged—ready for any audit or inspection, with zero manual binder assembly. The CTMS makes the invisible, visible.

- [ ] Chronological event timeline — vertical list, most recent at top
- [ ] Event types: protocol activation, amendment approvals, ICF version changes, patient consent logs (anonymized), today's SAE
- [ ] Each event shows: event type, date, actor (CRC name or "System"), one-line description
- [ ] Today's SAE entry highlighted as the most recent event
- [ ] "Download Regulatory Binder" button — non-functional in prototype, but visible

**Wow moment:** If an FDA inspector walked in right now, David pulls this screen. The complete regulatory record assembled itself — no binder required.

> **Today:** David manually assembles a binder from PDFs across multiple systems, email archives, and shared drives. Takes hours before an inspection or monitoring visit.

---


---


**Person D:**
To wrap up, we’ve shown how a modern CTMS can bring together research and regulatory teams, automate compliance, and provide real-time visibility for all stakeholders. This is more than a tool—it’s a new way of working. We hope this story has illustrated the value of a unified, intuitive platform—and we look forward to your questions and feedback.

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
