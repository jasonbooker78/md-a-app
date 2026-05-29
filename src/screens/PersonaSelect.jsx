import { useNavigate } from 'react-router-dom'
import { usePersona, personas } from '../context/PersonaContext'

const cards = [
  {
    personaId: 'crc',
    description:
      'Manage your daily visit schedule, document lab values and visit observations, log adverse events, and acknowledge protocol amendments — with a structured record at the department level.',
  },
  {
    personaId: 'irb',
    description:
      'Monitor amendment acknowledgment compliance, track SAE reporting deadlines, and access a complete regulatory timeline — without waiting on calls or emails.',
  },
  {
    personaId: 'pi',
    description:
      'View protocol performance metrics, visit completion rates, and EDC entry timeliness across your team — the data PIs need to evaluate study health and justify continued investment.',
  },
]

export default function PersonaSelect() {
  const navigate = useNavigate()
  const { setPersonaId } = usePersona()

  function enter(personaId) {
    setPersonaId(personaId)
    navigate(personas[personaId].home)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-mda-gray-200 shadow-sm h-14 flex items-center px-6">
        <img src="/MDAnderson_logo.png" alt="MD Anderson" className="h-9 object-contain" />
        <span className="mx-3 text-mda-gray-200">|</span>
        <span className="text-xs text-mda-gray-400 uppercase tracking-widest">Workflow Tracker</span>
      </header>

      {/* Hero */}
      <div className="bg-mda-navy text-white py-14 px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
          Department Workflow Tracker · MD Anderson Research
        </p>
        <h1 className="font-heading text-4xl font-normal text-white mb-4">
          Monday Morning on Protocol 2025-0004
        </h1>

        {/* What */}
        <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed mb-8">
          A <strong className="text-white font-semibold">Department Workflow Tracker</strong> is the operational backbone of a research department — centralizing coordinator observations, visit documentation, amendment compliance, and regulatory deadlines in one auditable place. It fills the gaps that institution-level systems like Epic and Encore don&apos;t cover at the department level.
        </p>

        {/* Why */}
        <div className="max-w-2xl mx-auto border-t border-white/10 pt-7">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Why we&apos;re here</p>
          <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed mb-6">
            MD Anderson&apos;s current department system — QuickBase — is unsupported after its sole maintainer&apos;s departure.
          </p>
        </div>
      </div>

      {/* Problem framing */}
      <div className="bg-white border-b border-gray-200 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-6 text-center">What we&apos;re solving</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                label: 'No structured place for visit observations',
                body: 'Coordinators manually record lab values and visit notes at the department level with no way to flag out-of-range values or document follow-up actions — everything lives in email threads and personal notebooks.',
              },
              {
                label: 'Amendment compliance has no audit trail',
                body: 'Regulatory Analysts send amendment notices by email and hope coordinators read them. At a monitoring visit, no one can prove who saw what or when.',
              },
              {
                label: 'Compliance is reactive, not automatic',
                body: 'SAE reporting deadlines are tracked on personal calendars. Inspection binders are assembled by hand from PDFs, emails, and shared drives — hours of work before every visit.',
              },
            ].map(({ label, body }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <p className="text-sm font-semibold text-gray-800 leading-snug mb-2">{label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body — timeline left, persona cards right */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-8 items-start">

          {/* Demo timeline */}
          <aside className="col-span-3 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">Demo walkthrough</p>

            {/* Act 1 */}
            <p className="text-xs font-semibold text-mda-blue uppercase tracking-wide mb-3">
              Act 1 · Maria — CRC
            </p>
            <ol className="relative border-l border-gray-200 space-y-5 ml-2 mb-7">
              {[
                {
                  n: 1, label: 'Work Queue', sub: "Today's visits, a pending amendment banner, and EDC entry deadlines",
                  wow: 'Everything she needs today in one place — no inbox, no spreadsheet, no tab-switching.',
                },
                {
                  n: 2, label: 'Amendment Detail', sub: 'One-click acknowledgment triggers a re-consent task automatically',
                  wow: 'One click, timestamped, immediately visible to the Regulatory Analyst — and the follow-up is already queued.',
                },
                {
                  n: 3, label: 'Visit Form', sub: 'Editable lab values with out-of-range flags and notes column',
                  wow: 'She documents the observation and the action taken in one step — not in an email sent later.',
                },
                {
                  n: 4, label: 'SAE Logging', sub: 'Flag adverse event; deadline auto-calculated',
                  wow: 'The reporting obligation surfaced itself. No manual deadline lookup, no call to the Regulatory Analyst.',
                },
              ].map(({ n, label, sub, wow }) => (
                <li key={n} className="pl-5 relative">
                  <span className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-mda-red text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {n}
                  </span>
                  <div className="grid grid-cols-2 gap-4 items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</p>
                    </div>
                    <p className="text-xs text-mda-blue italic leading-snug bg-blue-50 rounded px-2.5 py-1.5">
                      {wow}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Act 2 */}
            <p className="text-xs font-semibold text-mda-purple uppercase tracking-wide mb-3">
              Act 2 · David — Regulatory Analyst
            </p>
            <ol className="relative border-l border-gray-200 space-y-5 ml-2 mb-7">
              {[
                {
                  n: 5, label: 'Compliance Dashboard', sub: 'Acknowledgment tracker and SAE alert',
                  wow: "He's monitoring, not chasing — no email or phone call required.",
                },
                {
                  n: 6, label: 'Regulatory Timeline', sub: 'Audit-ready event history, auto-assembled',
                  wow: 'If an FDA inspector walked in right now, David pulls this screen. The binder assembled itself.',
                },
              ].map(({ n, label, sub, wow }) => (
                <li key={n} className="pl-5 relative">
                  <span className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-mda-purple text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {n}
                  </span>
                  <div className="grid grid-cols-2 gap-4 items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</p>
                    </div>
                    <p className="text-xs text-mda-purple italic leading-snug bg-purple-50 rounded px-2.5 py-1.5">
                      {wow}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Act 3 */}
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">
              Act 3 · Dr. K. — Principal Investigator
            </p>
            <ol className="relative border-l border-gray-200 space-y-5 ml-2">
              {[
                {
                  n: 7, label: 'Protocol Performance', sub: 'Visit completion and EDC entry timeliness by coordinator',
                  wow: 'The delta is visible in seconds — no spreadsheet, no weekly status email from Maria.',
                },
              ].map(({ n, label, sub, wow }) => (
                <li key={n} className="pl-5 relative">
                  <span className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {n}
                  </span>
                  <div className="grid grid-cols-2 gap-4 items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</p>
                    </div>
                    <p className="text-xs text-emerald-700 italic leading-snug bg-emerald-50 rounded px-2.5 py-1.5">
                      {wow}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          {/* Persona cards */}
          <div className="col-span-2">
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
              Select a role to begin
            </p>
            <div className="flex flex-col gap-5">
              {cards.map(({ personaId, description }) => {
                const p = personas[personaId]
                const accentColor =
                  p.id === 'crc' ? 'text-mda-red' :
                  p.id === 'irb' ? 'text-mda-purple' :
                  'text-emerald-700'
                return (
                  <button
                    key={p.id}
                    onClick={() => enter(p.id)}
                    className="group bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-left hover:border-mda-red hover:shadow-md transition-all duration-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white mb-4 ${p.avatarColor}`}
                    >
                      {p.initials}
                    </div>
                    <h2 className="font-heading text-lg text-gray-900 mb-0.5">{p.name}</h2>
                    <p className={`text-sm font-semibold mb-3 ${accentColor}`}>
                      {p.role}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                    <p className={`mt-5 text-sm font-semibold ${accentColor}`}>
                      Enter as {p.name} →
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
