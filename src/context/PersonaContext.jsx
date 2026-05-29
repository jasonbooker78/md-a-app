import { createContext, useContext, useState } from 'react'

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
      { label: 'Grant Management', to: '/grant-management', section: true },
    ],
  },
  irb: {
    id: 'irb',
    name: 'David M.',
    role: 'Regulatory Analyst',
    initials: 'DM',
    home: '/compliance-dashboard',
    avatarColor: 'bg-mda-purple',
    nav: [
      { label: 'Dashboard', to: '/compliance-dashboard' },
      { label: 'Protocols', to: null },
      { label: 'Reports', to: null },
      { label: 'SAEs', to: null },
      { label: 'Grant Management', to: '/grant-management', section: true },
    ],
  },
  pi: {
    id: 'pi',
    name: 'Dr. K.',
    role: 'Principal Investigator',
    initials: 'DK',
    home: '/faculty-dashboard',
    avatarColor: 'bg-emerald-700',
    nav: [
      { label: 'Protocol Performance', to: '/faculty-dashboard' },
      { label: 'Protocols', to: null },
      { label: 'Grant Management', to: '/grant-management', section: true },
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
