import Card from '../components/Card'
import { useDemoState } from '../context/DemoStateContext'

const protocols = ['2025-0004', '2024-0110', '2025-0011', '2025-0018']

const coordinatorRows = [
  { name: 'Maria R.', protocol: '2025-0004', scheduled: 12, completed: 11, entered: 9, lateCount: 2 },
  { name: 'James T.', protocol: '2025-0004', scheduled: 8, completed: 8, entered: 8, lateCount: 0 },
  { name: 'Priya N.', protocol: '2024-0110', scheduled: 5, completed: 5, entered: 4, lateCount: 1 },
  { name: 'Carlos M.', protocol: '2024-0110', scheduled: 6, completed: 5, entered: 5, lateCount: 0 },
]

const timelinessData = [
  { week: 'Apr 28', visits: 9, entered: 9 },
  { week: 'May 5', visits: 11, entered: 10 },
  { week: 'May 12', visits: 11, entered: 9 },
  { week: 'May 19', visits: 4, entered: 2 },
]

function entryRate(rows) {
  const totalCompleted = rows.reduce((s, r) => s + r.completed, 0)
  const totalEntered = rows.reduce((s, r) => s + r.entered, 0)
  return totalCompleted > 0 ? Math.round((totalEntered / totalCompleted) * 100) : 0
}

function StatusChip({ lateCount }) {
  if (lateCount === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5">
        ✓ Current
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-mda-orange bg-orange-50 border border-orange-200 rounded px-2 py-0.5">
      ⚠ {lateCount} late
    </span>
  )
}

export default function FacultyDashboard() {
  const { sae } = useDemoState()
  const onTimeRate = entryRate(coordinatorRows)
  const maxVisits = Math.max(...timelinessData.map(d => d.visits))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Protocol Performance</h1>
        <p className="text-mda-gray-600 text-sm mt-1">May 2026 · Read-only view · Dr. K.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card accent="none" className="px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Active Protocols</p>
          <p className="text-3xl font-bold text-mda-gray-800">{protocols.length}</p>
          <p className="text-xs text-mda-gray-400 mt-1">across department</p>
        </Card>
        <Card accent="none" className="px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">Visits This Month</p>
          <p className="text-3xl font-bold text-mda-gray-800">35</p>
          <p className="text-xs text-mda-gray-400 mt-1">4 pending today</p>
        </Card>
        <Card accent={onTimeRate < 85 ? 'orange' : 'none'} className="px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">On-Time Entry Rate</p>
          <p className={`text-3xl font-bold ${onTimeRate < 85 ? 'text-mda-orange' : 'text-green-600'}`}>
            {onTimeRate}%
          </p>
          <p className="text-xs text-mda-gray-400 mt-1">SOP target: 100%</p>
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

      {/* Visit Completion Table */}
      <Card accent="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100">
          <h2 className="text-sm font-semibold text-mda-gray-800">Visit Completion by Coordinator</h2>
          <p className="text-xs text-mda-gray-400 mt-0.5">Visits scheduled vs. completed vs. entered into EDC · May 2026</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-mda-gray-50 text-xs uppercase tracking-wide text-mda-gray-400">
            <tr>
              <th className="px-5 py-3 text-left">Coordinator</th>
              <th className="px-5 py-3 text-left">Protocol</th>
              <th className="px-5 py-3 text-right">Scheduled</th>
              <th className="px-5 py-3 text-right">Completed</th>
              <th className="px-5 py-3 text-right">Entered EDC</th>
              <th className="px-5 py-3 text-left">Entry Timeliness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mda-gray-100">
            {coordinatorRows.map((row) => (
              <tr key={`${row.name}-${row.protocol}`} className="hover:bg-mda-gray-50">
                <td className="px-5 py-3 font-medium text-mda-gray-800">{row.name}</td>
                <td className="px-5 py-3 text-mda-gray-600">{row.protocol}</td>
                <td className="px-5 py-3 text-right text-mda-gray-800">{row.scheduled}</td>
                <td className="px-5 py-3 text-right text-mda-gray-800">{row.completed}</td>
                <td className="px-5 py-3 text-right">
                  <span className={row.entered < row.completed ? 'text-mda-orange font-semibold' : 'text-mda-gray-800'}>
                    {row.entered}
                  </span>
                  {row.entered < row.completed && (
                    <span className="text-mda-gray-400 ml-1">/{row.completed}</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <StatusChip lateCount={row.lateCount} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-mda-gray-50 border-t border-mda-gray-200">
            <tr>
              <td className="px-5 py-3 text-xs font-semibold text-mda-gray-600" colSpan={2}>Total</td>
              <td className="px-5 py-3 text-right text-xs font-semibold text-mda-gray-800">
                {coordinatorRows.reduce((s, r) => s + r.scheduled, 0)}
              </td>
              <td className="px-5 py-3 text-right text-xs font-semibold text-mda-gray-800">
                {coordinatorRows.reduce((s, r) => s + r.completed, 0)}
              </td>
              <td className="px-5 py-3 text-right text-xs font-semibold text-mda-orange">
                {coordinatorRows.reduce((s, r) => s + r.entered, 0)}
              </td>
              <td className="px-5 py-3 text-xs text-mda-gray-400">
                {coordinatorRows.reduce((s, r) => s + r.lateCount, 0)} total late entries
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>

      {/* Entry Timeliness Chart */}
      <Card accent="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-mda-gray-800">EDC Entry Timeliness</h2>
            <p className="text-xs text-mda-gray-400 mt-0.5">Visits completed vs. entered into EDC — the gap is the risk</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-mda-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-mda-gray-200 inline-block"></span>Visits
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-mda-blue inline-block"></span>Entered EDC
            </span>
          </div>
        </div>
        <div className="px-5 py-6">
          <div className="space-y-4">
            {timelinessData.map((d) => (
              <div key={d.week} className="flex items-center gap-4">
                <span className="text-xs text-mda-gray-400 w-12 shrink-0">{d.week}</span>
                <div className="flex-1 space-y-1.5">
                  {/* Visits bar */}
                  <div className="flex items-center gap-2">
                    <div
                      className="bg-mda-gray-200 rounded-sm h-4"
                      style={{ width: `${(d.visits / maxVisits) * 100}%` }}
                    />
                    <span className="text-xs text-mda-gray-400">{d.visits}</span>
                  </div>
                  {/* Entered bar */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`rounded-sm h-4 ${d.entered < d.visits ? 'bg-mda-blue' : 'bg-mda-blue'}`}
                      style={{ width: `${(d.entered / maxVisits) * 100}%` }}
                    />
                    <span className={`text-xs font-semibold ${d.entered < d.visits ? 'text-mda-orange' : 'text-mda-blue'}`}>
                      {d.entered}
                    </span>
                    {d.entered < d.visits && (
                      <span className="text-xs text-mda-orange">
                        ({d.visits - d.entered} not yet entered)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-mda-gray-400 mt-5 border-t border-mda-gray-100 pt-4">
            May 19 is the current week — EDC entry is still in progress. SOP requires entry within 3 days of visit.
          </p>
        </div>
      </Card>
    </div>
  )
}
