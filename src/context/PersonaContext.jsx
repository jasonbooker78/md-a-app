import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const PersonaContext = createContext()

export const personas = {
  crc: {
    id: 'crc',
    name: 'Maria R.',
    role: 'Clinical Research Coordinator',
    initials: 'MR',
    home: '/work-queue',
    avatarColor: 'bg-mda-blue',
    nav: [
      { label: 'Dashboard', to: '/work-queue' },
      { label: 'Protocols', to: null },
      { label: 'Patients', to: null },
      { label: 'Queries', to: null, badge: '2' },
    ],
  },
  irb: {
    id: 'irb',
    name: 'David M.',
    role: 'IRB Administrator',
    initials: 'DM',
    home: '/compliance-dashboard',
    avatarColor: 'bg-mda-purple',
    nav: [
      { label: 'Dashboard', to: '/compliance-dashboard' },
      { label: 'Protocols', to: null },
      { label: 'Reports', to: null },
      { label: 'SAEs', to: null },
    ],
  },
}

export function PersonaProvider({ children }) {
  const [personaId, setPersonaId] = useState('crc')
  return (
    <PersonaContext.Provider value={{ personaId, setPersonaId }}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  return useContext(PersonaContext)
}
