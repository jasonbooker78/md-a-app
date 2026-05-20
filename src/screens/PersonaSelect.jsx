import { useNavigate } from 'react-router-dom'
import { usePersona, personas } from '../context/PersonaContext'

const cards = [
  {
    personaId: 'crc',
    description:
      'Manage your daily visit schedule, confirm pre-populated lab values from Epic, log adverse events, and acknowledge protocol amendments — all without re-keying data.',
  },
  {
    personaId: 'irb',
    description:
      'Monitor amendment acknowledgment compliance, track SAE reporting deadlines, and access a complete regulatory timeline — without waiting on calls or emails.',
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
      <header className="bg-mda-red text-white h-14 flex items-center px-6 shadow-md">
        <span className="font-heading text-lg">MD Anderson</span>
        <span className="mx-3 text-white/40">|</span>
        <span className="text-sm text-white/90">Oncology CTMS</span>
      </header>

      {/* Hero */}
      <div className="bg-mda-navy text-white py-14 px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
          Clinical Trial Management System · MD Anderson Oncology
        </p>
        <h1 className="font-heading text-4xl font-normal text-white mb-4">
          Monday Morning on Protocol THN-204
        </h1>

        {/* What */}
        <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed mb-8">
          A <strong className="text-white font-semibold">CTMS</strong> is the operational backbone of a research site — centralizing every participant, visit, document, and regulatory deadline across all active protocols in a single auditable record. It replaces the spreadsheets, email chains, and paper binders that currently hold the operation together.
        </p>

        {/* Why */}
        <div className="max-w-2xl mx-auto border-t border-white/10 pt-7">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Why we're here</p>
          <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed mb-6">
            MD Anderson's current CTMS — QuickBase — is unsupported after its sole maintainer's departure. 
          </p>

        </div>
      </div>

      {/* Problem framing */}
      <div className="bg-white border-b border-gray-200 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-6 text-center">What we're solving</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                label: 'Data re-entry is eating coordinator time',
                body: 'CRCs copy lab values out of Epic onto paper, then re-key them into the EDC — typically in a dedicated afternoon block. Every visit, every patient, every cycle.',
              },
              {
                label: 'Amendment compliance has no audit trail',
                body: 'IRB Admins send amendment notices by email and hope coordinators read them. At a monitoring visit, no one can prove who saw what or when.',
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
                  n: 1, label: 'Work Queue', sub: "Today's visits and a pending amendment banner",
                  wow: 'Everything she needs today in one place — no inbox, no spreadsheet, no tab-switching.',
                },
                {
                  n: 2, label: 'Amendment Detail', sub: 'One-click acknowledgment with auto-timestamp',
                  wow: 'One click, timestamped, immediately visible to the IRB Admin on their dashboard.',
                },
                {
                  n: 3, label: 'Visit Form', sub: 'Epic-imported labs and vitals, pre-filled',
                  wow: 'She reviews, not transcribes — the afternoon re-entry block is gone.',
                },
                {
                  n: 4, label: 'SAE Logging', sub: 'Flag adverse event; deadline auto-calculated',
                  wow: 'The reporting obligation surfaced itself. No manual deadline lookup, no call to IRB.',
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
              Act 2 · David — IRB Admin
            </p>
            <ol className="relative border-l border-gray-200 space-y-5 ml-2">
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
          </aside>

          {/* Persona cards */}
          <div className="col-span-2">
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
              Select a role to begin
            </p>
            <div className="flex flex-col gap-5">
              {cards.map(({ personaId, description }) => {
                const p = personas[personaId]
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
                    <p
                      className={`text-sm font-semibold mb-3 ${
                        p.id === 'crc' ? 'text-mda-red' : 'text-mda-purple'
                      }`}
                    >
                      {p.role}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                    <p
                      className={`mt-5 text-sm font-semibold ${
                        p.id === 'crc' ? 'text-mda-red' : 'text-mda-purple'
                      }`}
                    >
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
