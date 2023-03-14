import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/reset.css'
import Home from './components/Auth/Home'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/Auth/Login'
import Split from './components/split/Split'
import Navbar from './components/Navbar/Navbar'
import Transactions from './components/Transactions/Transactions'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Home />} />
        <Route element={<Navbar />}>
          <Route path='/split' element={<Split />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='Transactions' element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
