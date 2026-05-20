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
          Protocol THN-204 · Demo
        </p>
        <h1 className="font-heading text-4xl font-normal text-white mb-3">
          Monday Morning on Protocol THN-204
        </h1>
        <p className="text-white/60 text-base max-w-xl mx-auto">
          A 7-minute walkthrough showing how the system reduces coordinator work
          and builds a defensible compliance record — automatically.
        </p>
      </div>

      {/* Persona cards */}
      <div className="flex-1 flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-2xl">
          <p className="text-center text-xs text-gray-400 mb-8 uppercase tracking-widest">
            Select a role to begin
          </p>
          <div className="grid grid-cols-2 gap-6">
            {cards.map(({ personaId, description }) => {
              const p = personas[personaId]
              return (
                <button
                  key={p.id}
                  onClick={() => enter(p.id)}
                  className="group bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-left hover:border-mda-red hover:shadow-md transition-all duration-200"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white mb-5 ${p.avatarColor}`}
                  >
                    {p.initials}
                  </div>
                  <h2 className="font-heading text-xl text-gray-900 mb-0.5">{p.name}</h2>
                  <p
                    className={`text-sm font-semibold mb-4 ${
                      p.id === 'crc' ? 'text-mda-red' : 'text-mda-purple'
                    }`}
                  >
                    {p.role}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  <p
                    className={`mt-6 text-sm font-semibold ${
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
  )
}
