import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import SourceLabel from '../components/SourceLabel'
import { useDemoState } from '../context/DemoStateContext'

const epicTimestamp = 'May 19, 2026 · 6:14 AM'

const labs = [
  { name: 'ANC', value: '1.8', unit: '×10³/μL', normal: '1.8 – 7.7' },
  { name: 'Creatinine', value: '0.94', unit: 'mg/dL', normal: '0.60 – 1.20' },
  { name: 'ALT (LFT)', value: '28', unit: 'U/L', normal: '7 – 40' },
  { name: 'AST (LFT)', value: '22', unit: 'U/L', normal: '10 – 40' },
  { name: 'Total Bilirubin', value: '0.6', unit: 'mg/dL', normal: '0.1 – 1.2' },
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

export default function VisitForm() {
  const navigate = useNavigate()
  const { visit, saveVisit } = useDemoState()
  const [labValues, setLabValues] = useState(
    visit.labValues ?? labs.map(l => ({ ...l, editing: false }))
  )
  const [medConfirms, setMedConfirms] = useState(
    visit.medConfirms ?? meds.map(m => m.confirmed)
  )

  function toggleEdit(i) {
    setLabValues(prev => prev.map((l, idx) => idx === i ? { ...l, editing: !l.editing } : l))
  }

  function handleLabSave(i, newValue) {
    const updated = labValues.map((l, idx) =>
      idx === i ? { ...l, value: newValue, editing: false } : l
    )
    setLabValues(updated)
    saveVisit({ labValues: updated, medConfirms })
  }

  function handleMedToggle(i) {
    const updated = medConfirms.map((v, idx) => idx === i ? !v : v)
    setMedConfirms(updated)
    saveVisit({ labValues, medConfirms: updated })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <button onClick={() => navigate('/work-queue')} className="text-mda-blue text-sm hover:underline flex items-center gap-1">
        ← Back to Work Queue
      </button>

      {/* Visit header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading text-mda-gray-800">Cycle 2 Day 1 Visit</h1>
          <p className="text-mda-gray-600 text-sm mt-1">
            R.C. · Subject ID THN-204-012 · Protocol THN-204
          </p>
          <p className="text-xs text-mda-gray-400 mt-1">
            Visit window: May 17 – May 21, 2026 · Visit date: May 19, 2026
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/sae-logging')}
        >
          + Log Adverse Event
        </Button>
      </div>

      {/* Lab Values */}
      <Card accent="blue" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mda-gray-800">Lab Values</h2>
          <SourceLabel source="Epic" timestamp={epicTimestamp} />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-mda-gray-50 text-xs uppercase tracking-wide text-mda-gray-400">
            <tr>
              <th className="px-5 py-2 text-left">Test</th>
              <th className="px-5 py-2 text-left">Result</th>
              <th className="px-5 py-2 text-left">Reference Range</th>
              <th className="px-5 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mda-gray-100">
            {labValues.map((lab, i) => (
              <tr key={lab.name} className="hover:bg-mda-gray-50">
                <td className="px-5 py-3 font-medium text-mda-gray-800">{lab.name}</td>
                <td className="px-5 py-3">
                  {lab.editing ? (
                    <input
                      className="border border-mda-blue rounded px-2 py-0.5 w-20 text-sm"
                      defaultValue={lab.value}
                      autoFocus
                      onBlur={(e) => handleLabSave(i, e.target.value)}
                    />
                  ) : (
                    <span>{lab.value} <span className="text-mda-gray-400">{lab.unit}</span></span>
                  )}
                </td>
                <td className="px-5 py-3 text-mda-gray-400">{lab.normal}</td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleEdit(i)} className="text-xs text-mda-blue hover:underline">
                    {lab.editing ? 'Save' : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Vital Signs */}
      <Card accent="blue" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-mda-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mda-gray-800">Vital Signs</h2>
          <SourceLabel source="Epic" timestamp={epicTimestamp} />
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
        <div className="px-5 py-4 border-b border-mda-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mda-gray-800">Concomitant Medications</h2>
          <SourceLabel source="Epic" timestamp={epicTimestamp} />
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
    </div>
  )
}
