import { useState } from 'react'
import { Route, Routes } from 'react-router'
import AuthLayout from './layouts/auth-layout'
import { Navigate } from 'react-router'
import Login from './pages/auth/Login'
import Overview from './pages/overview/overview'
import UnitCreate from './pages/units/unit-create'
import UnitEdit from './pages/units/unit-edit'
import UnitList from './pages/units/unit-list'
import UnitTable from './pages/units/unit-table'
import UnitOfferLetterModal from './pages/units/unit-offerletter-modal'
import UnitLayout from './pages/units/unit-layout'
import DashboardLayout from './layouts/dashboard-layout'
import Error from './components/Error'
import PositionLayout from './pages/positions/position-layout'
import './App.css'
import PositionList from './pages/positions/position-list'
import PositionListBeta from './pages/positions/position-list-beta'
import PositionListProd from './pages/positions/position-list-prod'
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null
}

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}
function App() {

  return (
    <>
        <Routes>
        <Route exact path="/" element={<AuthLayout />} errorElement={<Error />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout/>
            </ProtectedRoute>
          }
          errorElement={<Error />}
        >
          <Route index element={<Overview />} />
          <Route path="units" element={<UnitLayout/>}> 
            <Route index element={<UnitList />} />
            <Route path="create" element={<UnitCreate />} />
            <Route path="edit/:id" element={<UnitEdit />} />
          </Route>
          <Route path="positions" element={<PositionLayout/>} errorElement={<Error />}> 
            <Route index element={<PositionListBeta />} errorElement={<Error />}/>
          </Route>
          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
    </>
  )
}

export default App
