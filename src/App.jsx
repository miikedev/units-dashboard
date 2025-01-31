import { useState } from 'react'
import './utils/config'
import { Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout'
import { Navigate } from 'react-router'
import Login from './pages/auth/Login'
import Overview from './pages/overview/Overview'
import UnitCreate from './pages/units/UnitCreate'
import UnitEdit from './pages/units/UnitEdit'
import UnitList from './pages/units/UnitList'
import UnitTable from './pages/units/UnitTable'
import UnitOfferLetterModal from './pages/units/UnitOfferLetterModal'
import UnitLayout from './pages/units/UnitLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Error from './components/Error'
import './App.css'

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
          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
    </>
  )
}

export default App
