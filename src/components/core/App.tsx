import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Dashboard } from './../../pages/Dashboard'
import { Login } from './../../pages/Login'
import { Wallet } from './../../pages/Wallet'

function Root() {
  return (
    <Routes>
      <Route path="/:id/dashboard" element={Dashboard()} />
      <Route path="/:id/wallet" element={Wallet()} />
      <Route path="/" element={Login()} />
    </Routes>
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
