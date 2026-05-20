import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PersonaProvider } from './context/PersonaContext'
import PageShell from './components/PageShell'
import WorkQueue from './screens/WorkQueue'
import AmendmentDetail from './screens/AmendmentDetail'
import VisitForm from './screens/VisitForm'
import SAELogging from './screens/SAELogging'
import ComplianceDashboard from './screens/ComplianceDashboard'
import RegulatoryTimeline from './screens/RegulatoryTimeline'

export default function App() {
  return (
    <PersonaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageShell />}>
            <Route index element={<Navigate to="/work-queue" replace />} />
            <Route path="work-queue" element={<WorkQueue />} />
            <Route path="amendment-detail" element={<AmendmentDetail />} />
            <Route path="visit-form" element={<VisitForm />} />
            <Route path="sae-logging" element={<SAELogging />} />
            <Route path="compliance-dashboard" element={<ComplianceDashboard />} />
            <Route path="regulatory-timeline" element={<RegulatoryTimeline />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersonaProvider>
  )
}
