import { useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import Card from '../components/Card'
import Button from '../components/Button'

const visits = [
  { patient: 'R.C.', subjectId: 'THN-204-012', protocol: 'THN-204', visit: 'Cycle 2 Day 1', time: '8:30 AM', room: 'Clinic B' },
  { patient: 'M.T.', subjectId: 'THN-204-008', protocol: 'THN-204', visit: 'Screening Visit', time: '10:00 AM', room: 'Clinic A' },
  { patient: 'J.W.', subjectId: 'GBM-110-003', protocol: 'GBM-110', visit: 'Cycle 1 Day 8', time: '1:15 PM', room: 'Infusion 3' },
  { patient: 'P.K.', subjectId: 'THN-204-015', protocol: 'THN-204', visit: 'End of Treatment', time: '3:00 PM', room: 'Clinic B' },
]

export default function WorkQueue() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Good morning, Maria</h1>
        <p className="text-mda-gray-600 text-sm mt-1">Tuesday, May 19, 2026 · 4 visits scheduled today</p>
      </div>

      {/* Amendment banner — highest priority */}
      <Banner
        variant="amendment"
        title="Protocol THN-204 amended — Acknowledgment required"
        body="ICF updated from v1.2 → v1.3. All assigned coordinators must acknowledge before enrolling new patients."
        action="Review & Acknowledge"
        onAction={() => navigate('/amendment-detail')}
      />

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
                {/* Time */}
                <span className="text-sm font-semibold text-mda-gray-800 w-16 shrink-0">{v.time}</span>
                {/* Patient + visit */}
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
              {v.subjectId === 'THN-204-012' ? (
                <Button size="sm" onClick={() => navigate('/visit-form')}>Open Visit</Button>
              ) : (
                <Button size="sm" variant="ghost">Open Visit</Button>
              )}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
