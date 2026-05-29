import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useDemoState } from '../context/DemoStateContext'

const labs = [
  { name: 'ANC', value: '1.5', unit: '×10³/μL', refMin: 1.8, refMax: 7.7, normal: '1.8 – 7.7', notes: '' },
  { name: 'Creatinine', value: '0.94', unit: 'mg/dL', refMin: 0.60, refMax: 1.20, normal: '0.60 – 1.20', notes: '' },
  { name: 'ALT (LFT)', value: '28', unit: 'U/L', refMin: 7, refMax: 40, normal: '7 – 40', notes: '' },
  { name: 'AST (LFT)', value: '22', unit: 'U/L', refMin: 10, refMax: 40, normal: '10 – 40', notes: '' },
  { name: 'Total Bilirubin', value: '0.6', unit: 'mg/dL', refMin: 0.1, refMax: 1.2, normal: '0.1 – 1.2', notes: '' },
]

const vitals = [
  { name: 'Blood Pressure', value: '118/74', unit: 'mmHg' },
  { name: 'Heart Rate', value: '72', unit: 'bpm' },
  { name: 'Temperature', value: '98.4', unit: '°F' },
  { name: 'Weight', value: '68.2', unit: 'kg' },
  { name: 'ECOG PS', value: '1', unit: '' },
]

const meds = [
  { name: 'Metformin 500mg', frequency: 'Twice daily', confirmed: true },
  { name: 'Lisinopril 10mg', frequency: 'Once daily', confirmed: true },
  { name: 'Ondansetron 8mg', frequency: 'As needed', confirmed: false },
]

const sopChecklist = [
  'Document the adverse event grade (CTCAE v5.0) at time of observation.',
  'Record onset date, duration, and resolution date (if applicable).',
  'Assess relationship to study drug: Unrelated / Possibly / Probably / Definitely.',
  'Notify PI within 24 hours for Grade 3+ events.',
  'For SAEs: complete sponsor SAE form within 24 hours of awareness.',
  'File all documentation in the patient\'s source documents.',
  'Update EDC within SOP-required window (3 days for visit data, 5 days for labs).',
]

function isOutOfRange(lab) {
  const val = parseFloat(lab.value)
  return !isNaN(val) && (val < lab.refMin || val > lab.refMax)
}

export default function VisitForm() {
  const navigate = useNavigate()
  const { visit, saveVisit } = useDemoState()
  const [labValues, setLabValues] = useState(
    visit.labValues ?? labs.map(l => ({ ...l }))
  )
  const [medConfirms, setMedConfirms] = useState(
    visit.medConfirms ?? meds.map(m => m.confirmed)
  )
  const [sopModalOpen, setSopModalOpen] = useState(false)

  function handleLabChange(i, field, value) {
    const updated = labValues.map((l, idx) =>
      idx === i ? { ...l, [field]: value } : l
    )
    setLabValues(updated)
    saveVisit({ labValues: updated, medConfirms })
  }

  function handleMedToggle(i) {
    const updated = medConfirms.map((v, idx) => idx === i ? !v : v)
    setMedConfirms(updated)
    saveVisit({ labValues, medConfirms: updated })
  }

  const flaggedCount = labValues.filter(isOutOfRange).length

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <button onClick={() => navigate('/work-queue')} className="text-mda-blue text-sm hover:underline flex items-center gap-1">
        ← Back to Work Queue
      </button>

      {/* Visit header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading text-mda-gray-800">Cycle 2 Day 1 Visit</h1>
          <p className="text-mda-gray-600 text-sm mt-1">
            R.C. · Subject ID 2025-0004-012 · Protocol 2025-0004
          </p>
          <p className="text-xs text-mda-gray-400 mt-1">
            Visit window: May 17 – May 21, 2026 · Visit date: May 19, 2026
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSopModalOpen(true)}
            className="text-xs text-mda-blue hover:underline"
          >
            View AE SOP
          </button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/sae-logging')}
          >
            + Log Adverse Event
          </Button>
        </div>
      </div>

      {/* Flagged values summary */}
      {flaggedCount > 0 && (
        <div className="flex items-center gap-2 text-sm bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
          <span className="text-mda-orange font-semibold">⚠</span>
          <span className="text-mda-orange font-semibold">
            {flaggedCount} lab value{flaggedCount > 1 ? 's' : ''} out of range
          </span>
          <span className="text-mda-gray-600">— document action taken in the Notes column</span>
        </div>
      )}

      {/* Lab Values */}
      <Card accent="blue" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100">
          <h2 className="text-sm font-semibold text-mda-gray-800">Lab Values</h2>
          <p className="text-xs text-mda-gray-400 mt-0.5">Enter values from Epic. Flag and document any out-of-range results.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mda-gray-50 text-xs uppercase tracking-wide text-mda-gray-400">
              <tr>
                <th className="px-4 py-2 text-left">Test</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Reference Range</th>
                <th className="px-4 py-2 text-left">Flag</th>
                <th className="px-4 py-2 text-left">Notes / Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mda-gray-100">
              {labValues.map((lab, i) => {
                const outOfRange = isOutOfRange(lab)
                return (
                  <tr key={lab.name} className={outOfRange ? 'bg-orange-50' : 'hover:bg-mda-gray-50'}>
                    <td className="px-4 py-3 font-medium text-mda-gray-800">{lab.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={lab.value}
                          onChange={(e) => handleLabChange(i, 'value', e.target.value)}
                          className={`border rounded px-2 py-1 w-20 text-sm focus:outline-none focus:ring-1 ${
                            outOfRange
                              ? 'border-mda-orange focus:ring-mda-orange'
                              : 'border-mda-gray-200 focus:ring-mda-blue'
                          }`}
                        />
                        <span className="text-mda-gray-400 text-xs whitespace-nowrap">{lab.unit}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-mda-gray-400 whitespace-nowrap">{lab.normal}</td>
                    <td className="px-4 py-3">
                      {outOfRange ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-mda-orange bg-orange-100 border border-orange-300 rounded px-2 py-0.5 whitespace-nowrap">
                          ⚠ Out of range
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded px-2 py-0.5 whitespace-nowrap">
                          ✓ Normal
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={lab.notes || ''}
                        onChange={(e) => handleLabChange(i, 'notes', e.target.value)}
                        placeholder={outOfRange ? 'Document action taken...' : 'Optional note...'}
                        className={`border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 ${
                          outOfRange
                            ? 'border-orange-300 placeholder-orange-300 focus:ring-mda-orange'
                            : 'border-mda-gray-200 focus:ring-mda-blue'
                        }`}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Vital Signs */}
      <Card accent="blue" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100">
          <h2 className="text-sm font-semibold text-mda-gray-800">Vital Signs</h2>
        </div>
        <div className="grid grid-cols-5 divide-x divide-mda-gray-100">
          {vitals.map((v) => (
            <div key={v.name} className="px-4 py-4 text-center">
              <p className="text-xs text-mda-gray-400 mb-1">{v.name}</p>
              <p className="text-lg font-semibold text-mda-gray-800">{v.value}</p>
              {v.unit && <p className="text-xs text-mda-gray-400">{v.unit}</p>}
            </div>
          ))}
        </div>
      </Card>

      {/* Concomitant Medications */}
      <Card accent="blue" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100">
          <h2 className="text-sm font-semibold text-mda-gray-800">Concomitant Medications</h2>
        </div>
        <div className="divide-y divide-mda-gray-100">
          {meds.map((med, i) => (
            <label key={med.name} className="flex items-center gap-4 px-5 py-3 hover:bg-mda-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={medConfirms[i]}
                onChange={() => handleMedToggle(i)}
                className="w-4 h-4 accent-mda-red"
              />
              <div>
                <p className="text-sm font-medium text-mda-gray-800">{med.name}</p>
                <p className="text-xs text-mda-gray-400">{med.frequency}</p>
              </div>
              {medConfirms[i] && <span className="ml-auto text-xs text-green-600 font-medium">Confirmed</span>}
            </label>
          ))}
        </div>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3 pb-4">
        <Button variant="ghost" onClick={() => navigate('/work-queue')}>Save Draft</Button>
        <Button onClick={() => navigate('/work-queue')}>Submit Visit</Button>
      </div>

      {/* SOP Modal */}
      {sopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-mda-red text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-base">AE Documentation SOP</h2>
                <p className="text-xs text-red-200 mt-0.5">Protocol-level requirements — all studies</p>
              </div>
              <button
                onClick={() => setSopModalOpen(false)}
                className="text-red-200 hover:text-white transition-colors text-xl leading-none"
                aria-label="Close SOP"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5">
              <ol className="space-y-3">
                {sopChecklist.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-mda-red text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-mda-gray-600 leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-mda-gray-400 mt-5 border-t border-mda-gray-100 pt-4">
                Full SOP content to be provided by Terry (study coordinator lead). This checklist is a placeholder for the demo.
              </p>
            </div>
            <div className="px-6 pb-5">
              <Button onClick={() => setSopModalOpen(false)} className="w-full">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
