import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Banner from '../components/Banner'
import { useDemoState } from '../context/DemoStateContext'
import { usePersona, personas } from '../context/PersonaContext'

function addDays(dateStr, days) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(year, month - 1, day + days)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function SAELogging() {
  const navigate = useNavigate()
  const { logSAE } = useDemoState()
  const { personaId } = usePersona()
  const persona = personas[personaId]
  const [eventDate, setEventDate] = useState('2026-05-19')
  const [grade, setGrade] = useState('')
  const [relatedness, setRelatedness] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isSAE = Number(grade) >= 3
  const deadline = eventDate ? addDays(eventDate, 7) : null

  function handleSubmit(e) {
    e.preventDefault()
    const loggedAt = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    logSAE({ loggedBy: persona.name, loggedAt, grade, relatedness, eventDate, deadline })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6 max-w-2xl">
        <button onClick={() => navigate('/visit-form')} className="text-mda-blue text-sm hover:underline flex items-center gap-1">
          ← Back to Visit Form
        </button>
        <Card accent="red" className="p-8 text-center space-y-4">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-heading font-semibold text-mda-gray-800">SAE Logged Successfully</h2>
          <p className="text-sm text-mda-gray-600">
            Grade {grade} adverse event recorded for R.C. · Protocol 2025-0004
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg px-5 py-4 inline-block mx-auto">
            <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-1">7-Day Expedited Report Due</p>
            <p className="text-xl font-bold text-mda-red">{deadline}</p>
          </div>
          <p className="text-xs text-mda-gray-400">David M. (Regulatory Analyst) has been notified · {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
          <Button onClick={() => navigate('/compliance-dashboard')}>View Compliance Dashboard →</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Breadcrumb */}
      <button onClick={() => navigate('/visit-form')} className="text-mda-blue text-sm hover:underline flex items-center gap-1">
        ← Back to Visit Form
      </button>

      <div>
        <h1 className="text-2xl font-heading text-mda-gray-800">Log Adverse Event</h1>
        <p className="text-mda-gray-600 text-sm mt-1">R.C. · Subject ID 2025-0004-012 · Protocol 2025-0004</p>
      </div>

      {/* SAE flag banner — shown when Grade ≥ 3 */}
      {isSAE && (
        <Banner
          variant="sae"
          title="Serious Adverse Event (SAE) — Expedited reporting required"
          body="Grade 3+ events on this protocol require a 7-day expedited FDA report. Deadline is calculated below."
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card accent="none" className="p-6 space-y-5">

          {/* Event date */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-mda-gray-400 mb-1.5">
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              className="border border-mda-gray-200 rounded px-3 py-2 text-sm text-mda-gray-800 w-48 focus:outline-none focus:border-mda-blue"
              required
            />
          </div>

          {/* Grade selector */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-mda-gray-400 mb-1.5">
              CTCAE Grade
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(String(g))}
                  className={`w-10 h-10 rounded-lg text-sm font-bold border-2 transition-all ${
                    grade === String(g)
                      ? g >= 3
                        ? 'bg-mda-red text-white border-mda-red'
                        : 'bg-mda-blue text-white border-mda-blue'
                      : 'bg-white text-mda-gray-600 border-mda-gray-200 hover:border-mda-gray-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {grade && (
              <p className="text-xs mt-2 text-mda-gray-600">
                {Number(grade) >= 3
                  ? <span className="text-mda-red font-medium">Grade {grade} — SAE classification triggered</span>
                  : `Grade ${grade} — non-serious adverse event`}
              </p>
            )}
          </div>

          {/* Relatedness */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-mda-gray-400 mb-1.5">
              Relatedness to Study Drug
            </label>
            <select
              value={relatedness}
              onChange={e => setRelatedness(e.target.value)}
              className="border border-mda-gray-200 rounded px-3 py-2 text-sm text-mda-gray-800 w-56 focus:outline-none focus:border-mda-blue"
              required
            >
              <option value="">Select…</option>
              <option>Unrelated</option>
              <option>Possibly related</option>
              <option>Probably related</option>
              <option>Definitely related</option>
            </select>
          </div>

          {/* Auto-calculated deadline */}
          {isSAE && deadline && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-mda-gray-400 mb-0.5">7-Day Expedited Report Due</p>
                <p className="text-lg font-bold text-mda-red">{deadline}</p>
              </div>
              <span className="text-2xl">📅</span>
            </div>
          )}
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" type="button" onClick={() => navigate('/visit-form')}>Cancel</Button>
          <Button
            type="submit"
            variant={isSAE ? 'primary' : 'primary'}
            disabled={!grade || !relatedness}
          >
            {isSAE ? 'Submit SAE Report' : 'Submit AE Report'}
          </Button>
        </div>
      </form>
    </div>
  )
}
