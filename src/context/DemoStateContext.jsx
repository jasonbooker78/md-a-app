import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'ctms-demo-state'

const defaultState = {
  amendment: {
    acknowledged: false,
    acknowledgedBy: null,
    acknowledgedAt: null,
  },
  sae: {
    logged: false,
    loggedBy: null,
    loggedAt: null,
    grade: null,
    relatedness: null,
    eventDate: null,
    deadline: null,
  },
}

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // sessionStorage unavailable — continue without persistence
  }
}

const DemoStateContext = createContext()

export function DemoStateProvider({ children }) {
  const [state, setState] = useState(() => loadState() ?? defaultState)

  function update(patch) {
    setState(prev => {
      const next = { ...prev, ...patch }
      saveState(next)
      return next
    })
  }

  function acknowledgeAmendment(personaName, timestamp) {
    update({
      amendment: { acknowledged: true, acknowledgedBy: personaName, acknowledgedAt: timestamp },
    })
  }

  function logSAE({ loggedBy, loggedAt, grade, relatedness, eventDate, deadline }) {
    update({
      sae: { logged: true, loggedBy, loggedAt, grade, relatedness, eventDate, deadline },
    })
  }

  function resetDemo() {
    saveState(defaultState)
    setState(defaultState)
  }

  return (
    <DemoStateContext.Provider value={{ ...state, acknowledgeAmendment, logSAE, resetDemo }}>
      {children}
    </DemoStateContext.Provider>
  )
}

export function useDemoState() {
  return useContext(DemoStateContext)
}
