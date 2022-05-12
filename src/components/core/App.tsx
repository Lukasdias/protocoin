import * as React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom'

import { AuthProvider, RequireAuth } from './Auth'

import { Account } from '../../pages/Account/index'
import { Login } from './../../pages/Login'
import { Wallet } from '../Wallet/index'
import { Dashboard } from '../DashboardComponents/DashboardBody/index'

function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/:id/account"
          element={<RequireAuth>{<Account />}</RequireAuth>}
        />
        <Route
          path="/:id/account/dashboard"
          element={<RequireAuth>{<Dashboard />}</RequireAuth>}
        />
        <Route
          path="/:id/account/wallet"
          element={<RequireAuth>{<Wallet />}</RequireAuth>}
        />

        <Route path="/" element={Login()} />

        <Route path="/:id" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

function App() {
  return (
    <Router>
      <Root />
    </Router>
  )
}

export default App
