import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import Banner from '../components/Banner'
import { useDemoState } from '../context/DemoStateContext'

export default function ComplianceDashboard() {
  const navigate = useNavigate()
  const { amendment, sae } = useDemoState()

  // Maria's status is live; others are static demo fixtures
  const coordinators = [
    {
      name: 'Maria R.',
      role: 'Lead CRC',
      status: amendment.acknowledged ? 'acknowledged' : 'pending',
      timestamp: amendment.acknowledged ? amendment.acknowledgedAt : null,
      reminder: !amendment.acknowledged,
    },
    { name: 'James T.', role: 'CRC', status: 'pending', reminder: true },
    { name: 'Priya N.', role: 'CRC', status: 'acknowledged', timestamp: 'May 19, 2026 · 9:02 AM' },
    { name: 'Carlos M.', role: 'CRC', status: 'pending', reminder: false },
  ]

  const acknowledgedCount = coordinators.filter(c => c.status === 'acknowledged').length
  const pendingCount = coordinators.filter(c => c.status === 'pending').length

  const saeTimeAgo = sae.loggedAt ? `logged at ${sae.loggedAt} by ${sae.loggedBy}` : ''

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Compliance Dashboard</h1>
        <p className="text-mda-gray-600 text-sm mt-1">Tuesday, May 19, 2026 · Regulatory Analyst — David M.</p>
      </div>

      {/* SAE Alert — only shown after Maria logs one */}
      {sae.logged && (
        <Banner
          variant="sae"
          title={`New SAE · 2025-0004 · ${saeTimeAgo}`}
          body={`Grade ${sae.grade} adverse event — FDA 7-day expedited report due ${sae.deadline}.`}
          action="View Details"
          onAction={() => navigate('/regulatory-timeline')}
        />
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card accent="orange" className="px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Pending Acknowledgments</p>
          <p className="text-3xl font-bold text-mda-orange">{pendingCount}</p>
          <p className="text-xs text-mda-gray-400 mt-1">of {coordinators.length} assigned CRCs</p>
        </Card>
        <Card accent="none" className="px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Acknowledged</p>
          <p className="text-3xl font-bold text-green-600">{acknowledgedCount}</p>
          <p className="text-xs text-mda-gray-400 mt-1">Amendment 3 · 2025-0004</p>
        </Card>
        <Card accent={sae.logged ? 'red' : 'none'} className="px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Open SAEs</p>
          <p className={`text-3xl font-bold ${sae.logged ? 'text-mda-red' : 'text-mda-gray-400'}`}>
            {sae.logged ? 1 : 0}
          </p>
          <p className="text-xs text-mda-gray-400 mt-1">
            {sae.logged ? `Report due ${sae.deadline}` : 'No active SAEs'}
          </p>
        </Card>
      </div>

      {/* Amendment acknowledgment tracker */}
      <Card accent="orange" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-mda-gray-800">Amendment 3 Acknowledgment Tracker</h2>
            <p className="text-xs text-mda-gray-400 mt-0.5">Protocol 2025-0004 · ICF v1.2 → v1.3 · Effective May 19, 2026</p>
          </div>
          <span className="text-xs text-mda-orange font-semibold">{acknowledgedCount}/{coordinators.length} complete</span>
        </div>
        <div className="divide-y divide-mda-gray-100">
          {coordinators.map((crc) => (
            <div key={crc.name} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                  crc.status === 'acknowledged' ? 'bg-green-500' : 'bg-mda-gray-400'
                }`}>
                  {crc.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-mda-gray-800">{crc.name}</p>
                  <p className="text-xs text-mda-gray-400">{crc.role}</p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge variant={crc.status === 'acknowledged' ? 'acknowledged' : 'pending'} />
                {crc.timestamp && (
                  <p className="text-xs text-mda-gray-400 mt-1">{crc.timestamp}</p>
                )}
                {crc.status === 'pending' && crc.reminder && (
                  <p className="mt-1"><StatusBadge variant="reminder" /></p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SAE detail card — only shown after SAE is logged */}
      {sae.logged && (
        <Card accent="red" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-mda-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-mda-gray-800">Active SAEs</h2>
            <StatusBadge variant="sae" />
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-mda-gray-800">
                Grade {sae.grade} Adverse Event · R.C. (2025-0004-012)
              </p>
              <p className="text-xs text-mda-gray-600">
                Protocol 2025-0004 · Logged by {sae.loggedBy} · {sae.loggedAt}
              </p>
              <p className="text-xs text-mda-gray-400">
                Relatedness: {sae.relatedness} · Cycle 2 Day 1 visit
              </p>
            </div>
            <div className="text-right shrink-0 ml-6">
              <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">FDA Report Due</p>
              <p className="text-base font-bold text-mda-red">{sae.deadline}</p>
              <Button size="sm" variant="secondary" className="mt-2" onClick={() => navigate('/regulatory-timeline')}>
                View Timeline →
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
