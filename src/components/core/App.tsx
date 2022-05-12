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


function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/:id/account"
          element={<RequireAuth>{<Account />}</RequireAuth>}
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
