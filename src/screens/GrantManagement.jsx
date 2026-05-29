import Card from '../components/Card'

export default function GrantManagement() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Grant Management</h1>
        <p className="text-mda-gray-600 text-sm mt-1">Grant lifecycle tracking and reporting</p>
      </div>

      {/* Coming soon state */}
      <Card accent="none" className="overflow-hidden">
        <div className="px-6 py-10 text-center">
          <div className="w-12 h-12 rounded-full bg-mda-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-mda-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="font-heading text-lg text-mda-gray-800 mb-2">Coming in the next sprint</h2>
          <p className="text-sm text-mda-gray-600 max-w-sm mx-auto leading-relaxed">
            Grant lifecycle tracking is a separate module — built for the grants team, not the trials coordinators.
            Feature scope to be defined with Terry and the department grants office.
          </p>
        </div>
      </Card>

      {/* Planned scope */}
      <Card accent="none" className="p-6 space-y-4">
        <p className="text-sm font-semibold text-mda-gray-800">What this module will cover</p>
        <ul className="space-y-2.5">
          {[
            'Grant application lifecycle — from submission to award to close-out',
            'Budget tracking and effort reporting against awarded funds',
            'Progress report deadlines and milestone alerts',
            'Sponsor and foundation contact management',
            'Coordination with the institutional grants office (OSP)',
            'PI access to grant portfolio alongside protocol performance',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-mda-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-mda-gray-400 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-mda-gray-400 border-t border-mda-gray-100 pt-4 leading-relaxed">
          Note from Thomas: "Grants and clinical trials are two different rooms in the same house."
          This module is intentionally scoped separately from the clinical trials workflow —
          the audiences and data are mostly distinct.
        </p>
      </Card>
    </div>
  )
}
