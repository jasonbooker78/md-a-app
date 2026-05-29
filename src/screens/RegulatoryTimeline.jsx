import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import TimelineEntry from '../components/TimelineEntry'
import { useDemoState } from '../context/DemoStateContext'

const staticEvents = [
  {
    type: 'amendment',
    date: 'May 16, 2026',
    actor: 'System',
    description: 'Amendment 3 approved by IRB. ICF updated from v1.2 to v1.3. Acknowledgment required from all assigned CRCs.',
  },
  {
    type: 'consent',
    date: 'Apr 4, 2026',
    actor: 'Maria R.',
    description: 'Patient R.C. (2025-0004-012) re-consented using ICF v1.2 following Amendment 2.',
  },
  {
    type: 'amendment',
    date: 'Mar 28, 2026',
    actor: 'System',
    description: 'Amendment 2 approved by IRB. Dose escalation criteria updated. ICF v1.1 → v1.2.',
  },
  {
    type: 'consent',
    date: 'Feb 12, 2026',
    actor: 'Maria R.',
    description: 'Patient M.T. (2025-0004-008) enrolled and consented using ICF v1.1.',
  },
  {
    type: 'consent',
    date: 'Jan 30, 2026',
    actor: 'Maria R.',
    description: 'Patient R.C. (2025-0004-012) enrolled and consented using ICF v1.1.',
  },
  {
    type: 'icf',
    date: 'Jan 15, 2026',
    actor: 'System',
    description: 'Amendment 1 approved by IRB. Eligibility criteria clarified. ICF v1.0 → v1.1.',
  },
  {
    type: 'activation',
    date: 'Dec 3, 2025',
    actor: 'System',
    description: 'Protocol 2025-0004 activated. Site initiation visit complete. ICF v1.0 approved.',
  },
]

export default function RegulatoryTimeline() {
  const navigate = useNavigate()
  const { amendment, sae } = useDemoState()

  // Build events list dynamically based on what Maria has done
  const events = [
    ...(sae.logged ? [{
      type: 'sae',
      date: `May 19, 2026 · ${sae.loggedAt}`,
      actor: sae.loggedBy,
      description: `Grade ${sae.grade} adverse event logged for R.C. (2025-0004-012) — Cycle 2 Day 1. Relatedness: ${sae.relatedness}. FDA 7-day report due ${sae.deadline}.`,
      isHighlighted: true,
    }] : []),
    ...(amendment.acknowledged ? [{
      type: 'amendment',
      date: amendment.acknowledgedAt,
      actor: amendment.acknowledgedBy,
      description: 'Amendment 3 acknowledged — ICF v1.3 reviewed and confirmed.',
    }] : []),
    ...staticEvents,
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate('/compliance-dashboard')}
        className="text-mda-blue text-sm hover:underline flex items-center gap-1"
      >
        ← Back to Compliance Dashboard
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading text-mda-gray-800">Regulatory Timeline</h1>
          <p className="text-mda-gray-600 text-sm mt-1">Protocol 2025-0004 · Complete history · {events.length} events</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          title="Non-functional in prototype"
        >
          ↓ Download Regulatory Binder
        </Button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-mda-gray-400 flex-wrap">
        {[
          { color: 'bg-mda-red', label: 'SAE' },
          { color: 'bg-mda-orange', label: 'Amendment' },
          { color: 'bg-mda-purple', label: 'Consent / ICF' },
          { color: 'bg-mda-blue', label: 'Activation' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <Card accent="none" className="px-6 py-2">
        {events.map((event, i) => (
          <TimelineEntry
            key={i}
            type={event.type}
            date={event.date}
            actor={event.actor}
            description={event.description}
            isHighlighted={event.isHighlighted}
          />
        ))}
        {/* Cap the spine */}
        <div className="flex gap-4 pb-2">
          <div className="flex flex-col items-center w-3">
            <div className="w-3 h-3 rounded-full bg-mda-gray-200" />
          </div>
          <p className="text-xs text-mda-gray-400 pb-1">Protocol 2025-0004 initiated Dec 3, 2025</p>
        </div>
      </Card>
    </div>
  )
}
