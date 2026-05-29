import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { usePersona, personas } from '../context/PersonaContext'
import { useDemoState } from '../context/DemoStateContext'

function PersonaPicker({ onClose }) {
  const { personaId, setPersonaId } = usePersona()
  const { resetDemo } = useDemoState()
  const navigate = useNavigate()

  function switchTo(id) {
    setPersonaId(id)
    navigate(personas[id].home)
    onClose()
  }

  function handleReset() {
    resetDemo()
    onClose()
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-mda-gray-200 overflow-hidden z-50">
      <div className="px-4 py-2.5 border-b border-mda-gray-100">
        <p className="text-xs uppercase tracking-widest text-mda-gray-400">Switch persona</p>
      </div>
      {Object.values(personas).map((p) => (
        <button
          key={p.id}
          onClick={() => switchTo(p.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-mda-gray-50 transition-colors ${
            personaId === p.id ? 'bg-mda-gray-50' : ''
          }`}
        >
          <div className={`w-8 h-8 rounded-full ${p.avatarColor} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
            {p.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-mda-gray-800">{p.name}</p>
            <p className="text-xs text-mda-gray-400">{p.role}</p>
          </div>
          {personaId === p.id && (
            <span className="ml-auto text-xs text-mda-blue font-medium">Active</span>
          )}
        </button>
      ))}
      <div className="border-t border-mda-gray-100 px-4 py-3">
        <button
          onClick={handleReset}
          className="w-full text-left text-xs text-mda-gray-400 hover:text-mda-red transition-colors"
        >
          ↺ Reset demo state
        </button>
      </div>
    </div>
  )
}

export default function PageShell() {
  const { personaId } = usePersona()
  const persona = personas[personaId]
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-mda-gray-50">
      <header className="bg-white border-b border-mda-gray-200 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <NavLink to="/">
              <img src="/MDAnderson_logo.png" alt="MD Anderson" className="h-9 object-contain" />
            </NavLink>
            <span className="text-mda-gray-200 text-sm hidden sm:block">|</span>
            <span className="text-xs text-mda-gray-400 uppercase tracking-widest hidden sm:block">Workflow Tracker</span>
          </div>

          {/* Primary nav — persona-specific */}
          <nav className="flex items-center gap-0.5 flex-1" aria-label="Primary navigation">
            {persona.nav.map((item) => (
              <span key={item.label} className="flex items-center">
                {item.section && (
                  <span className="text-mda-gray-200 text-xs mx-2 select-none" aria-hidden="true">|</span>
                )}
                {item.to ? (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors uppercase tracking-widest font-bold ${
                        isActive
                          ? 'bg-mda-red text-white'
                          : 'text-mda-gray-600 hover:bg-mda-gray-100 hover:text-mda-gray-900'
                      }`
                    }
                  >
                    {item.label}
                    {item.badge && (
                      <span className={`text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none ${
                        'bg-mda-red text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ) : (
                  <span
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded text-mda-gray-300 cursor-not-allowed select-none uppercase tracking-widest font-bold"
                    title="Not available in prototype"
                  >
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Profile / persona picker */}
          <div className="relative shrink-0" ref={pickerRef}>
            <button
              onClick={() => setPickerOpen((o) => !o)}
              className="flex items-center gap-2.5 hover:bg-mda-gray-100 rounded-lg px-2.5 py-1.5 transition-colors"
              aria-haspopup="true"
              aria-expanded={pickerOpen}
              aria-label="Switch persona"
            >
              <div className={`w-7 h-7 rounded-full ${persona.avatarColor} text-white text-xs font-bold flex items-center justify-center`}>
                {persona.initials}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-mda-gray-800 leading-tight">{persona.name}</p>
                <p className="text-xs text-mda-gray-500 leading-tight">{persona.role}</p>
              </div>
              <svg className="w-3.5 h-3.5 text-mda-gray-400 ml-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {pickerOpen && <PersonaPicker onClose={() => setPickerOpen(false)} />}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-mda-gray-800 text-mda-gray-400 text-xs text-center py-3">
        MD Anderson Cancer Center · Department Workflow Tracker Prototype · May 2026
      </footer>
    </div>
  )
}
