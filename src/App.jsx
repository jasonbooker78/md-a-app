import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { PersonaProvider } from './context/PersonaContext'
import { DemoStateProvider } from './context/DemoStateContext'
import PersonaSelect from './screens/PersonaSelect'
import PageShell from './components/PageShell'
import WorkQueue from './screens/WorkQueue'
import AmendmentDetail from './screens/AmendmentDetail'
import VisitForm from './screens/VisitForm'
import SAELogging from './screens/SAELogging'
import ComplianceDashboard from './screens/ComplianceDashboard'
import RegulatoryTimeline from './screens/RegulatoryTimeline'
import FacultyDashboard from './screens/FacultyDashboard'
import GrantManagement from './screens/GrantManagement'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <DemoStateProvider>
      <PersonaProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PersonaSelect />} />
            <Route element={<PageShell />}>
              <Route path="work-queue" element={<WorkQueue />} />
              <Route path="amendment-detail" element={<AmendmentDetail />} />
              <Route path="visit-form" element={<VisitForm />} />
              <Route path="sae-logging" element={<SAELogging />} />
              <Route path="compliance-dashboard" element={<ComplianceDashboard />} />
              <Route path="regulatory-timeline" element={<RegulatoryTimeline />} />
              <Route path="faculty-dashboard" element={<FacultyDashboard />} />
              <Route path="grant-management" element={<GrantManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersonaProvider>
    </DemoStateProvider>
  )
}
