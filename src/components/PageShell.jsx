import { NavLink, Outlet } from 'react-router-dom'

const crcLinks = [
  { to: '/work-queue', label: 'Work Queue' },
  { to: '/amendment-detail', label: 'Amendment Detail' },
  { to: '/visit-form', label: 'Visit Form' },
  { to: '/sae-logging', label: 'SAE Logging' },
]

const irbLinks = [
  { to: '/compliance-dashboard', label: 'Compliance Dashboard' },
  { to: '/regulatory-timeline', label: 'Regulatory Timeline' },
]

export default function PageShell() {
  return (
    <div className="min-h-screen flex flex-col bg-mda-gray-50">
      {/* Top Nav */}
      <header className="bg-mda-red text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-bold tracking-wide">MD Anderson</span>
            <span className="text-red-200 text-sm">|</span>
            <span className="text-sm text-red-100">Clinical Trials Management</span>
          </div>
          <span className="text-xs text-red-200 uppercase tracking-widest">Prototype · THN-204</span>
        </div>

        {/* Persona nav strips */}
        <div className="border-t border-red-800 bg-mda-red-dark">
          <div className="max-w-7xl mx-auto px-6 flex items-stretch gap-8">
            <span className="text-xs text-red-300 uppercase tracking-widest self-center mr-2">CRC — Maria</span>
            {crcLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm py-2 border-b-2 transition-colors ${
                    isActive
                      ? 'border-white text-white font-semibold'
                      : 'border-transparent text-red-200 hover:text-white hover:border-red-300'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <span className="text-red-700 self-center mx-2">|</span>
            <span className="text-xs text-red-300 uppercase tracking-widest self-center mr-2">IRB Admin — David</span>
            {irbLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm py-2 border-b-2 transition-colors ${
                    isActive
                      ? 'border-white text-white font-semibold'
                      : 'border-transparent text-red-200 hover:text-white hover:border-red-300'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-mda-gray-800 text-mda-gray-400 text-xs text-center py-3">
        MD Anderson Cancer Center · Oncology CTMS Prototype · May 2026
      </footer>
    </div>
  )
}
