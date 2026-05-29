import { useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import Card from '../components/Card'
import Button from '../components/Button'
import { useDemoState } from '../context/DemoStateContext'

const visits = [
  { patient: 'R.C.', subjectId: '2025-0004-012', protocol: '2025-0004', visit: 'Cycle 2 Day 1', time: '8:30 AM', room: 'Clinic B' },
  { patient: 'M.T.', subjectId: '2025-0004-008', protocol: '2025-0004', visit: 'Screening Visit', time: '10:00 AM', room: 'Clinic A' },
  { patient: 'J.W.', subjectId: '2024-0110-003', protocol: '2024-0110', visit: 'Cycle 1 Day 8', time: '1:15 PM', room: 'Infusion 3' },
  { patient: 'P.K.', subjectId: '2025-0004-015', protocol: '2025-0004', visit: 'End of Treatment', time: '3:00 PM', room: 'Clinic B' },
]

const pendingEDC = [
  { patient: 'M.T.', subjectId: '2025-0004-008', protocol: '2025-0004', visit: 'Screening Visit', visitDate: 'May 16, 2026', daysRemaining: 3 },
  { patient: 'J.W.', subjectId: '2024-0110-003', protocol: '2024-0110', visit: 'Cycle 1 Day 1', visitDate: 'May 17, 2026', daysRemaining: 1 },
]

function deadlineColor(days) {
  if (days <= 0) return 'text-mda-red font-semibold'
  if (days <= 1) return 'text-mda-orange font-semibold'
  return 'text-green-700'
}

function deadlineBg(days) {
  if (days <= 0) return 'bg-red-50'
  if (days <= 1) return 'bg-orange-50'
  return 'hover:bg-mda-gray-50'
}

export default function WorkQueue() {
  const navigate = useNavigate()
  const { amendment, reconsentTask } = useDemoState()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Good morning, Maria</h1>
        <p className="text-mda-gray-600 text-sm mt-1">Tuesday, May 19, 2026 · 4 visits scheduled today</p>
      </div>

      {/* Amendment banner — hidden once acknowledged */}
      {!amendment.acknowledged && (
        <Banner
          variant="amendment"
          title="Protocol 2025-0004 amended — Acknowledgment required"
          body="ICF updated from v1.2 → v1.3. All assigned coordinators must acknowledge before enrolling new patients."
          action="Review & Acknowledge"
          onAction={() => navigate('/amendment-detail')}
        />
      )}
      {amendment.acknowledged && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <span>✓</span>
          <span>Amendment 3 acknowledged by {amendment.acknowledgedBy} · {amendment.acknowledgedAt}</span>
        </div>
      )}

      {/* Re-consent task — appears after amendment acknowledgment */}
      {reconsentTask.generated && (
        <div className="flex items-start gap-3 text-sm bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
          <span className="text-mda-blue text-base mt-0.5">↩</span>
          <div className="flex-1">
            <p className="font-semibold text-mda-blue">Re-consent required — enrolled patients on ICF v1.3</p>
            <p className="text-xs text-mda-gray-600 mt-0.5">
              Contact all currently enrolled patients to obtain updated consent. Due {reconsentTask.dueDate}.
            </p>
          </div>
          <span className="text-xs font-semibold text-mda-blue shrink-0 mt-0.5">Due {reconsentTask.dueDate}</span>
        </div>
      )}

      {/* Query indicator */}
      <div className="flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 bg-mda-purple text-white text-xs font-semibold px-3 py-1 rounded-full">
          2 queries due this week
        </span>
        <span className="text-mda-gray-400">· 3 days remaining</span>
      </div>

      {/* Visit task list */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-mda-gray-400 mb-3">Today's Visits</h2>
        <Card accent="none" className="divide-y divide-mda-gray-100">
          {visits.map((v) => (
            <div key={v.subjectId} className="flex items-center justify-between px-5 py-4 hover:bg-mda-gray-50 transition-colors">
              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold text-mda-gray-800 w-16 shrink-0">{v.time}</span>
                <div>
                  <p className="text-sm font-semibold text-mda-gray-800">
                    {v.patient}
                    <span className="ml-2 text-xs font-normal text-mda-gray-400">{v.subjectId}</span>
                  </p>
                  <p className="text-xs text-mda-gray-600 mt-0.5">
                    {v.visit} · <span className="font-medium">{v.protocol}</span> · {v.room}
                  </p>
                </div>
              </div>
              {v.subjectId === '2025-0004-012' ? (
                <Button size="sm" onClick={() => navigate('/visit-form')}>Open Visit</Button>
              ) : (
                <Button size="sm" variant="ghost">Open Visit</Button>
              )}
            </div>
          ))}
        </Card>
      </div>

      {/* Pending EDC Entry */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-mda-gray-400 mb-3">Pending EDC Entry</h2>
        <Card accent="none" className="divide-y divide-mda-gray-100">
          {pendingEDC.map((item) => (
            <div
              key={item.subjectId}
              className={`flex items-center justify-between px-5 py-4 transition-colors ${deadlineBg(item.daysRemaining)}`}
            >
              <div className="flex items-center gap-5">
                <div>
                  <p className="text-sm font-semibold text-mda-gray-800">
                    {item.patient}
                    <span className="ml-2 text-xs font-normal text-mda-gray-400">{item.subjectId}</span>
                  </p>
                  <p className="text-xs text-mda-gray-600 mt-0.5">
                    {item.visit} · <span className="font-medium">{item.protocol}</span> · Visit date: {item.visitDate}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm ${deadlineColor(item.daysRemaining)}`}>
                  {item.daysRemaining > 0
                    ? `${item.daysRemaining} day${item.daysRemaining === 1 ? '' : 's'} remaining to enter`
                    : 'Overdue — enter now'}
                </p>
                <p className="text-xs text-mda-gray-400 mt-0.5">SOP window: 3 days from visit</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
