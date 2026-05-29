import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useDemoState } from '../context/DemoStateContext'
import { usePersona, personas } from '../context/PersonaContext'

export default function AmendmentDetail() {
  const navigate = useNavigate()
  const { amendment, reconsentTask, acknowledgeAmendment } = useDemoState()
  const { personaId } = usePersona()
  const persona = personas[personaId]

  function handleAcknowledge() {
    const ts = new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    })
    acknowledgeAmendment(persona.name, ts)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/work-queue')}
        className="text-mda-blue text-sm hover:underline flex items-center gap-1"
      >
        ← Back to Work Queue
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Amendment Detail</h1>
        <p className="text-mda-gray-600 text-sm mt-1">Protocol 2025-0004 · Amendment 3</p>
      </div>

      {/* Amendment metadata */}
      <Card accent="orange" className="p-6 space-y-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Protocol</dt>
            <dd className="font-semibold text-mda-gray-800">2025-0004</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Amendment</dt>
            <dd className="font-semibold text-mda-gray-800">Amendment 3</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">IRB Approval Date</dt>
            <dd className="font-semibold text-mda-gray-800">May 16, 2026</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Effective Date</dt>
            <dd className="font-semibold text-mda-gray-800">May 19, 2026</dd>
          </div>
        </dl>

        <hr className="border-mda-gray-200" />

        {/* What changed */}
        <div>
          <h2 className="text-sm font-semibold text-mda-gray-800 mb-2">What Changed</h2>
          <p className="text-sm text-mda-gray-600">
            The Informed Consent Form (ICF) has been updated to include additional language about
            potential cardiac monitoring requirements identified in the interim safety review.
            Patients currently enrolled must be re-consented using the new form before their next study visit.
          </p>
        </div>

        {/* ICF version change */}
        <div className="flex items-center gap-4 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
          <span className="text-xs uppercase tracking-wide text-mda-gray-400">ICF Version</span>
          <span className="text-sm font-semibold text-mda-gray-800 line-through opacity-50">v1.2</span>
          <span className="text-mda-orange font-bold">→</span>
          <span className="text-sm font-bold text-mda-orange">v1.3</span>
        </div>
      </Card>

      {/* Acknowledge action */}
      <Card accent="none" className="p-6">
        {amendment.acknowledged ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold text-green-700">Acknowledged</p>
              <p className="text-xs text-mda-gray-400 mt-0.5">
                {amendment.acknowledgedBy} · {amendment.acknowledgedAt} · Regulatory Analyst has been notified
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-mda-gray-600">
              By acknowledging, you confirm you have read Amendment 3 and understand the updated consent requirements.
            </p>
            <Button size="lg" onClick={handleAcknowledge} className="shrink-0">
              Acknowledge
            </Button>
          </div>
        )}
      </Card>

      {/* Re-consent follow-up task — appears after acknowledgment */}
      {amendment.acknowledged && reconsentTask.generated && (
        <Card accent="blue" className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-mda-blue text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              ↩
            </div>
            <div>
              <p className="text-sm font-semibold text-mda-gray-800">Follow-up task generated</p>
              <p className="text-sm text-mda-gray-600 mt-1">
                Re-consent required for enrolled patients on ICF v1.3 — due {reconsentTask.dueDate}
              </p>
              <p className="text-xs text-mda-gray-400 mt-1.5">
                This task has been added to your Work Queue as a pending action item.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
